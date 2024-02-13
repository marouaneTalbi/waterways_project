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
class EstablishmentSearchController extends AbstractController {

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
            if(intval($request->query->get('location'))) {
                $establishmentList = $this->establishmentRepository->findBy(['city' => $request->query->get('location'), 'name' => $request->query->get('search')]);
                foreach ($establishmentList as $establishment) {
                    $result[] = $establishment;
                }
            } else if($request->query->get('location')) {
                $establishmentCity = $this->establishmentRepository->findBy(['city' => $request->query->get('location')]);
                foreach ($establishmentCity as $establishment) {
                    $result[] = $establishment;
                }
            } else if($request->query->get('search')) {
                $establishmentName = $this->establishmentRepository->findBy(['name' => $request->query->get('search')]);
                foreach ($establishmentName as $establishment) {
                    
                    $result[] = $establishment;
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