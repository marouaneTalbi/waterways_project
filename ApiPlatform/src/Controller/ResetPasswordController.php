<?php

namespace App\Controller;

use App\Repository\UserRepository;
use App\State\UserPasswordHasher;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class ResetPasswordController extends AbstractController
{
    private $entityManager;
    private $passwordEncoder;
    private $mailer;
    private  $userRepository;


    public function __construct(
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordEncoder,
        UserPasswordHasher $mailer,
        UserRepository $userRepository,
    )
    {
        $this->entityManager = $entityManager;
        $this->passwordEncoder = $passwordEncoder;
        $this->mailer = $mailer;
        $this->userRepository = $userRepository;
    }


        public function __invoke(Request $request): Response
        {
            $data = json_decode($request->getContent(), true);
            $token = $data['token'] ?? null;
            $newPassword = $data['password'] ?? null;

            $user = $this->userRepository->findOneByPasswordResetToken($token);
           // dd($this->isTokenValid($user, $token));


            if (!$this->isTokenValid($user, $token)) {
                return new Response('Invalid token', Response::HTTP_BAD_REQUEST);
            }

           if ($newPassword) {
                $user->setPassword($this->passwordEncoder->hashPassword($user, $newPassword));
                $this->entityManager->flush();

                return new Response('Password reset successful', Response::HTTP_OK);
           }

            return new Response('No new password provided', Response::HTTP_BAD_REQUEST);
        }

        private function isTokenValid(User $user, ?string $token): bool
        {
            if ($token === null || $user->getPasswordResetToken() === null) {
                return false;
            }

            if ($token !== $user->getPasswordResetToken()) {
                return false;
            }

           // $tokenExpiration = $user->getPasswordResetTokenExpiration();
            //if ($tokenExpiration === null || new \DateTime() > $tokenExpiration) {
            //    return false;
           // }

            return true;
        }
}

