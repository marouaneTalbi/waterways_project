<?php

namespace App\Controller;

use App\Entity\Reservation;
use App\Repository\SlotRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Serializer\Annotation\Groups;

#[AsController]
class HistoryReservationController extends AbstractController
{
    private SlotRepository $slotRepository;
    private EntityManagerInterface $entityManager;

    public function __construct(SlotRepository $slotRepository, EntityManagerInterface $entityManager)
    {
        $this->slotRepository = $slotRepository;
        $this->entityManager = $entityManager;
    }

    public function __invoke(int $id): array
    {
        $reservations = $this->entityManager->getRepository(Reservation::class)->findBy(['consumer' => $id]);
        //dd($reservations);
        $response = [];

        foreach ($reservations as $reservation) {
            $slots = $this->slotRepository->findSlotsForHistory($reservation, new \DateTime());
            $response[] = [
                'reservation'=>$reservation->getId(),
                'reservationDate'=>$reservation->getReservationDate(),
                'slots'=>array_shift($slots)
            ];
        }
        //dd($response);
        return $response;
    }
}
