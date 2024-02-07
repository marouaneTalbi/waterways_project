<?php
namespace App\State;
use ApiPlatform\Metadata\DeleteOperationInterface;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\User;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

final class UserProcessor implements ProcessorInterface
{
    private MailerInterface $mailer;

    public function __construct(
        private ProcessorInterface $persistProcessor,
        private ProcessorInterface $removeProcessor,
        MailerInterface $mailer)
    {
        $this->mailer = $mailer;
    }
    public function process($data, Operation $operation, array $uriVariables = [], array $context = [])
    {
        if ($operation instanceof DeleteOperationInterface) {
            return $this->removeProcessor->process($data, $operation, $uriVariables, $context);
        }
        $result = $this->persistProcessor->process($data, $operation, $uriVariables, $context);
        $this->sendWelcomeEmail($data);
        return $result;
    }

    private function sendWelcomeEmail(User $user)
    {
        $currentEmail = (new Email())
            ->from('challenge.noreply@gmail.com')
            ->to($user->getEmail())
            ->subject('Time for Symfony Mailer!')
            ->text('Sending emails is fun again!')
            ->html('<p>See Twig integration for better HTML integration!</p>');

        $this->mailer->send($currentEmail);
    }
}