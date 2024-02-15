<?php

namespace App\Controller;

use App\Entity\Boat;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use App\Repository\BoatRepository;
use App\Repository\EstablishmentRepository;
use App\Repository\UserRepository;
use App\Repository\NoteRepository;

#[AsController]
class UserGetSatisfaction extends AbstractController {

    private $boatRepository;
    private $userRepository;
    private $establishmentRepository;
    private $noteRepository;

    public function __construct(
        BoatRepository $boatRepository,
        UserRepository $userRepository,
        EstablishmentRepository $establishmentRepository,
        NoteRepository $noteRepository
    ) {
        $this->boatRepository = $boatRepository;
        $this->userRepository = $userRepository;
        $this->establishmentRepository = $establishmentRepository;
        $this->noteRepository = $noteRepository;
    }
        
    public function __invoke(Request $request)
    {
        $boats = [];
        $notes = [];

        $user = $this->userRepository->find($request->get('id'));
        if(!$user) {
            return "user note found";
        }

        $establishments = $user->getEstablishments();
        foreach($establishments as $establishment) {
            $establishmentBoats = $establishment->getBoats();
            $boats = $establishmentBoats;
        }

        foreach($boats as $boat) {
            $boatNotes = $this->noteRepository->getProviderBoatNotes(intval($boat->getId()));
            foreach($boatNotes as $note) {
                $notes[] = $note;
            }
        }

        $totalProprete = 0;
        $totalConfort = 0;
        $totalPerformance = 0;
        $totalEquipement = 0;

        foreach ($notes as $note) {
            $totalProprete += $note->getProprete();
                $totalConfort += $note->getConfort();
                $totalPerformance += $note->getPerformance();
                $totalEquipement += $note->getEquipement();
        }

        $totalNotes = count($notes);
        if($totalNotes > 0) {
            $averageProprete = ($totalProprete / (5 * $totalNotes)) * 5;
            $averageConfort = ($totalConfort / (5 * $totalNotes)) * 5;
            $averagePerformance = ($totalPerformance / (5 * $totalNotes)) * 5;
            $averageEquipement = ($totalEquipement / (5 * $totalNotes)) * 5;
    
            $overallAverage = (($averageProprete + $averageConfort + $averagePerformance + $averageEquipement) / 4) * 20;
    
            return number_format($overallAverage, 2);
        } else {
            return 0;
        }
    }
}