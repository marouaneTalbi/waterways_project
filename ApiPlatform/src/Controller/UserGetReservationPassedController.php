<?php

namespace App\Controller;

use App\Entity\Boat;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use App\Repository\BoatRepository;
use App\Repository\EstablishmentRepository;
use App\Repository\ReservationRepository;
use App\Repository\UserRepository;
use App\Repository\NoteRepository;
use App\Repository\SlotRepository;

#[AsController]
class UserGetReservationPassedController extends AbstractController {

    private $boatRepository;
    private $userRepository;
    private $establishmentRepository;
    private $reservationRepository;
    private $slotRepository;

    public function __construct(
        BoatRepository $boatRepository,
        UserRepository $userRepository,
        EstablishmentRepository $establishmentRepository,
        ReservationRepository $reservationRepository,
        SlotRepository $slotRepository
    ) {
        $this->boatRepository = $boatRepository;
        $this->userRepository = $userRepository;
        $this->establishmentRepository = $establishmentRepository;
        $this->reservationRepository = $reservationRepository;
        $this->slotRepository = $slotRepository;
    }
        
    public function __invoke(Request $request)
    {
        $slots = [];
        $reservations = [];

        $user = $this->userRepository->find($request->get('id'));
        if(!$user) {
            return "user note found";
        }

        $establishments = $user->getEstablishments();
        foreach($establishments as $establishment) {
            $establishmentBoats = $establishment->getBoats();
            foreach($establishmentBoats as $boat) {
                $reservationsBoat = $this->reservationRepository->findBy(['boat' => $boat->getId()]);
                foreach($reservationsBoat as $reservation) {
                    $slot = $this->slotRepository->findSlotsForHistory($reservation, new \DateTime());
                    $slots = $slot;
                }
            }
        }
        return count($slots);
    }
}