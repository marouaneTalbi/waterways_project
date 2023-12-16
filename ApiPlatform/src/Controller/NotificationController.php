<?php
namespace App\Controller;
use App\Entity\Notification;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;

#[AsController]
final class NotificationController extends AbstractController
{
    public function __invoke(Request $request, SerializerInterface $serializer): Notification
    {
        $user = $this->getUser();
        if (!$user) {
            throw new BadRequestHttpException('no user connected');
        }

        $data = json_decode($request->getContent(), true);
        $title = $data['title'] ?? null;
        $message = $data['message'] ?? null;

        if (!$title || !$message) {
            throw new BadRequestHttpException('Title and message are required');
        }

        $notification = new Notification();
        $notification->setUserId($user);
        $notification->setTitle($title);
        $notification->setMessage($message);
        $notification->setCreatedAt(new \DateTimeImmutable());
        return $notification; 
    }
}