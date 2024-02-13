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
        // Recherche de la réservation avec l'ID fourni
        $reservation = $entityManager->getRepository(Reservation::class)->find($id);

        // Vérifie si la réservation existe
        if (!$reservation) {
            throw new NotFoundHttpException('Reservation not found.');
        }

        // Récupération des bateaux associés à la réservation
        $boats = $reservation->getBoat();

        // Serialize les données des bateaux
        $data = $serializer->serialize($boats, 'json', ['groups' => ['boat:read']]);

        // Retourne les données sérialisées sous forme de réponse JSON
        return new JsonResponse($data, JsonResponse::HTTP_OK, [], true);
    }
}
