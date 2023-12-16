<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Boat;
use App\Repository\BoatRepository;
use App\Repository\EstablishmentRepository;
use App\Repository\UserRepository;

class SearchStateProvider implements ProcessorInterface
{
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

    public function process($data, Operation $operation, array $uriVariables = [], array $context = [])
    {
        $result = [];
        
        $boatSizeList = $this->boatRepository->findBy(['capacity' => intval($data->getPeople())]);
        foreach ($boatSizeList as $boat) {
            $result[] = $boat;
        }

        $establishments = $this->establishmentRepository->findBy(['city' => $data->getLocation()]);
        foreach ($establishments as $establishment) {
            $boats = $establishment->getBoats();
            foreach ($boats as $boat) {
                $result[] = $boat;
            }
        }

        $boatNameList = $this->boatRepository->findBy(['name' => $data->getSearch()]);
        foreach ($boatNameList as $boat) {
            $result[] = $boat;
        }

        $boatOwner = $this->userRepository->findUsersByNameAndRole($data->getSearch());
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

        $obj = (object) $uniqueResult;
        return $obj;
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
