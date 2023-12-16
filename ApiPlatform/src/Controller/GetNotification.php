<?php

namespace App\Controller;

use App\Repository\NotificationRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Security;

class GetNotification extends AbstractController
{
    private $security;
    private $notificationRepository;

    public function __construct(Security $security, NotificationRepository $notificationRepository)
    {
        $this->security = $security;
        $this->notificationRepository = $notificationRepository;
    }

    public function __invoke(): Response
{
    $user = $this->security->getUser();
    if (!$user) {
        return new Response(null, Response::HTTP_FORBIDDEN);
    }
    $res = $this->notificationRepository->findBy(['user' => $user, 'status' => 'unread']);
    return $this->json(['count' => count($res)]);
}

}
