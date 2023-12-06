<?php
namespace App\Controller;

use App\Entity\Establishment;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\UserRepository;
use App\Repository\EstablishmentRepository;

#[AsController]
class EstablishmentController extends AbstractController
{
    private  $userRepository;
    private  $establishmentRepository;

    public function __construct(
        UserRepository $userRepository,
        EstablishmentRepository $establishmentRepository
    ) {
        $this->userRepository = $userRepository;
        $this->establishmentRepository = $establishmentRepository;
    }

    public function __invoke(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $user = $this->userRepository->findOneByEmail($data['user']);
        $establishment = new Establishment();
        $establishment->setName($data['name']);
        $establishment->setAddress($data['address']);
        $establishment->setUser($user);
        $establishment->setStartDate(new \DateTimeImmutable($data['startDate']));
        $establishment->setEndDate(new \DateTimeImmutable($data['endDate']));

        $this->establishmentRepository->save($establishment, true);

        return $establishment;
    }
}