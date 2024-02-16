<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use App\Repository\SlotRepository;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Reservation;

#[AsController]
class UserGetGainController extends AbstractController {

    private $slotRepository;
    private EntityManagerInterface $entityManager;

    public function __construct(
        SlotRepository $slotRepository,
        EntityManagerInterface $entityManager
    ) {
        $this->slotRepository = $slotRepository;
        $this->entityManager = $entityManager;
    }
        
    public function __invoke(Request $request)
    {
        $reservations = $this->entityManager->getRepository(Reservation::class)->findBy(['consumer' => $request->get('id')]);
        //dd($reservations);
        $response = [];

        foreach ($reservations as $reservation) {
            $slots = $this->slotRepository->findSlotsForHistory($reservation, new \DateTime());
            foreach($slots as $slot) {
                $price = $slot->getBoat()->getPrice();
                $response[] = $price;
            }
        }

        return array_sum($response);
    }
}