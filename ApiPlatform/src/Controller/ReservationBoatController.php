<?php

namespace App\Controller;

use App\Entity\Reservation;
use App\Entity\Boat;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Serializer\SerializerInterface;

#[AsController]
class ReservationBoatController extends AbstractController
{
    public function __invoke(Request $request, EntityManagerInterface $entityManager, SerializerInterface $serializer, $id): JsonResponse
    {
        $reservation = $entityManager->getRepository(Reservation::class)->find($id);

        if (!$reservation) {
            throw new NotFoundHttpException('Reservation not found.');
        }

        $boats = $reservation->getBoat();
        $data = $serializer->serialize($boats, 'json', ['groups' => ['boat:read']]);

        return new JsonResponse($data, JsonResponse::HTTP_OK, [], true);
    }
}
