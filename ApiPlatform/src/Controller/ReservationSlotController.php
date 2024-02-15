<?php

namespace App\Controller;

use App\Entity\Reservation;
use App\Repository\SlotRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Annotation\Groups;

#[AsController]
class ReservationSlotController extends AbstractController
{
    public function __invoke(Request $request, EntityManagerInterface $entityManager, SerializerInterface $serializer, $id): JsonResponse
    {
        $reservation = $entityManager->getRepository(Reservation::class)->find($id);

        if (!$reservation) {
            throw new NotFoundHttpException('Reservation not found.');
        }

        $slots = $reservation->getSlots();
        $data = $serializer->serialize($slots, 'json', ['groups' => ['slots:read']]);

        return new JsonResponse($data, JsonResponse::HTTP_OK, [], true);
    }
}
