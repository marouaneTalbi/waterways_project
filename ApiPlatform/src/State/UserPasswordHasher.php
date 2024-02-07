<?php
# api/src/State/UserPasswordHasher.php
namespace App\State;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\User;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Doctrine\ORM\EntityManagerInterface;
final class UserPasswordHasher implements ProcessorInterface
{
    private MailerInterface $mailer;
    private EntityManagerInterface $entityManager;

    public function __construct(
        private readonly ProcessorInterface $processor,
        private readonly UserPasswordHasherInterface $passwordHasher,
        MailerInterface $mailer,
        UrlGeneratorInterface $router,
        EntityManagerInterface $entityManager
    )
    {
        $this->mailer = $mailer;
        $this->router = $router;
        $this->entityManager = $entityManager;

    }
    public function process($data, Operation $operation, array $uriVariables = [], array $context = [])
    {

        if ($data instanceof User && $data->getPlainPassword()) {
            $hashedPassword = $this->passwordHasher->hashPassword($data, $data->getPlainPassword());
            $data->setPassword($hashedPassword);
            $data->eraseCredentials();

            if ($operation->getMethod()) {
                $verificationToken = bin2hex(random_bytes(32));
                $data->setToken($verificationToken);
                $this->sendWelcomeEmail($data);
            }
        }
        return $this->processor->process($data, $operation, $uriVariables, $context);
    }

    private function sendWelcomeEmail(User $user)
    {
        $verificationUrl = $this->router->generate(
            'user_verify',
            ['token' =>  $user->getToken()],
            UrlGeneratorInterface::ABSOLUTE_URL);

        $currentEmail = (new Email())
            ->from('challenge.noreply@gmail.com')
            ->to($user->getEmail())
            ->subject('Time for Symfony Mailer!')
            ->text('Sending emails is fun again!')
            ->html("<p>Please verify your account by clicking <a href=\"{$verificationUrl}\">here</a>.</p>");

        $this->mailer->send($currentEmail);
    }

    public function sendVerificationEmail(User $user)
    {
        $verificationUrl = $this->router->generate(
            'user_verify',
            ['token' =>  $user->getPasswordResetToken()],
            UrlGeneratorInterface::ABSOLUTE_URL);

        $currentEmail = (new Email())
            ->from('challenge.noreply@gmail.com')
            ->to($user->getEmail())
            ->subject('Email verification')
            ->text('')
            ->html("<p>Cliquez ici pour changer votre mot de passe <a href=\"http://localhost:3000/resetmdp/" . $user->getPasswordResetToken() . "\">ici</a>.</p>");

        $this->mailer->send($currentEmail);
    }
}