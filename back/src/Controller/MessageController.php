<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route; // Utilisez l'annotation Route ici
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class MessageController
{
    /**
     * @Route("/api/message", name="api_message")
     */
    public function getMessage()
    {
        $message = "Hello React.js";
        return new JsonResponse(['message' => $message]);
    }
}