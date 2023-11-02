<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Component\HttpFoundation\Response;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class RegisterController extends AbstractController
{
    #[Route(path: '/api/register', name: 'api_register', methods: ['POST'] )]

    public function register(Request $request, UserPasswordHasherInterface $passwordEncoder, EntityManagerInterface $entityManager): Response
    {
        $requestData = json_decode($request->getContent(), true);
        $email = $requestData['email']; // Remplacez par le nom d'utilisateur
        $plainPassword = $requestData['password']; // Remplacez par le mot de passe
        // $firstname = $requestData['firstname']; // Remplacez par le mot de passe
        // $lastname = $requestData['lastname']; // Remplacez par le mot de passe
        $token = $requestData['token']; // Remplacez par le mot de passe


        $user = new User();
        $user->setEmail($email);
        $user->setToken($token);

        $user->setPassword($passwordEncoder->hashPassword(
            $user,
            $plainPassword
        ));

        $entityManager->persist($user);
        $entityManager->flush();

        return new Response('Utilisateur enregistré avec succès',Response::HTTP_OK);
    }
}