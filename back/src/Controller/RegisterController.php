<?php

namespace App\Controller;

use App\Entity\User;
use App\Services\MailerService;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\Mailer;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mailer\Transport;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class RegisterController extends AbstractController
{
    private $mailer;

    public function __construct(MailerInterface $mailer)
    {
         $this->mailer = $mailer;
    }




    #[Route(path: '/api/register', name: 'api_register', methods: ['POST'] )]
    public function register(Request $request, UserPasswordHasherInterface $passwordEncoder, EntityManagerInterface $entityManager, MailerInterface $mailer): Response
    {
        $email = (new Email())
            ->from('marwane.berkani@gmail.com')
            ->to('marwane.berkani@gmail.com')
            ->subject('Time for Symfony Mailer!')
            ->text('Sending emails is fun again!')
            ->html('<p>See Twig integration for better HTML integration!</p>');

            $mailer->send($email);
        // $requestData = json_decode($request->getContent(), true);
        // $email = $requestData['email']; // Remplacez par le nom d'utilisateur
        //  $plainPassword = $requestData['password']; // Remplacez par le mot de passe
        // $firstname = $requestData['firstname']; // Remplacez par le mot de passe
        // $lastname = $requestData['lastname']; // Remplacez par le mot de passe
        //  $token = $requestData['token']; // Remplacez par le mot de passe


        //  $user = new User();
        //   $user->setEmail($email);
        //    $user->setToken($token);

        //   $user->setPassword($passwordEncoder->hashPassword(
        //       $user,
        //       $plainPassword
        //    ));

        // $entityManager->persist($user);
        //  $entityManager->flush();

        return new Response('Utilisateur enregistré avec succès',Response::HTTP_OK);
    }

    
}