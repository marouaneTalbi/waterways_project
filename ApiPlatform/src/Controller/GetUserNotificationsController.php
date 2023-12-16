<?php
namespace App\Controller;

use App\Repository\NotificationRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Security;
use Doctrine\ORM\EntityManagerInterface;

class GetUserNotificationsController extends AbstractController
{
    private $security;
    private $notificationRepository;

    public function __construct(Security $security, NotificationRepository $notificationRepository, EntityManagerInterface $entityManager)
    {
        $this->security = $security;
        $this->notificationRepository = $notificationRepository;
        $this->entityManager = $entityManager;
    }

    public function __invoke(): Response
    {
        $user = $this->security->getUser();
        if (!$user) {
            return new Response(null, Response::HTTP_FORBIDDEN);
        }
        $notifications = $this->notificationRepository->findBy(['user' => $user]);
        foreach ($notifications as $notification) {
            $notification->setStatus('read');
            $this->entityManager->persist($notification);
        }
        $this->entityManager->flush();
        return $this->json($notifications);
    }
}
