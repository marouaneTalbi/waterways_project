<?php

namespace App\Controller;

use App\Entity\Boat;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use App\Repository\BoatRepository;
use App\Repository\EstablishmentRepository;
use App\Repository\UserRepository;

#[AsController]
class BoatSearchController extends AbstractController {

    private $boatRepository;
    private $userRepository;
    private $establishmentRepository;

    public function __construct(
        BoatRepository $boatRepository,
        UserRepository $userRepository,
        EstablishmentRepository $establishmentRepository
    ) {
        $this->boatRepository = $boatRepository;
        $this->userRepository = $userRepository;
        $this->establishmentRepository = $establishmentRepository;
    }
        
        public function __invoke(Request $request)
        {
        $result = [];
        
        $boatSizeList = $this->boatRepository->findBy(['capacity' => intval($request->query->get('people'))]);
        foreach ($boatSizeList as $boat) {
            $result[] = $boat;
        }

        $establishments = $this->establishmentRepository->findBy(['city' => $request->query->get('location')]);
        foreach ($establishments as $establishment) {
            $boats = $establishment->getBoats();
            foreach ($boats as $boat) {
                $result[] = $boat;
            }
        }

        $boatNameList = $this->boatRepository->findBy(['name' => $request->query->get('search')]);
        foreach ($boatNameList as $boat) {
            $result[] = $boat;
        }

        $boatOwner = $this->userRepository->findUsersByNameAndRole($request->query->get('search'));
        if($boatOwner) {
            $establishments = $boatOwner->getEstablishments();
            foreach ($establishments as $establishment) {
                $boats = $establishment->getBoats();
                foreach ($boats as $boat) {
                    $result[] = $boat;
                }
            }
        }

        $uniqueResult = $this->uniqueObjectsById($result);

        return $uniqueResult;
    }

    private function uniqueObjectsById(array $objects): array
    {
        $uniqueObjects = [];
        $uniqueIds = [];

        foreach ($objects as $object) {
            $id = $object->getId(); // Assurez-vous que votre classe a une méthode getId().

            if (!in_array($id, $uniqueIds)) {
                $uniqueIds[] = $id;
                $uniqueObjects[] = $object;
            }
        }

        return $uniqueObjects;
    }
}