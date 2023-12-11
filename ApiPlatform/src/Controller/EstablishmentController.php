<?php
namespace App\Controller;

use App\Entity\Establishment;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpFoundation\Request;
use App\Repository\UserRepository;
use App\Repository\EstablishmentRepository;
use Symfony\Component\Security\Core\Security;


#[AsController]
class EstablishmentController extends AbstractController
{
    private  $userRepository;
    private  $establishmentRepository;
    private $security;

    public function __construct(
        UserRepository $userRepository,
        EstablishmentRepository $establishmentRepository,
        Security $security
    ) {
        $this->userRepository = $userRepository;
        $this->establishmentRepository = $establishmentRepository;
        $this->security = $security;
    }

    public function __invoke(Request $request)
    {

        dd($request);
        $user = $this->security->getUser();
        $data = json_decode($request->getContent(), true);
        $establishment = new Establishment();
        $establishment->setName($data['name']); 
        $establishment->setAddress($data['address']);
        $establishment->setCreatedby($user);
        $establishment->setStartDate(new \DateTimeImmutable($data['startDate']));
        $establishment->setEndDate(new \DateTimeImmutable($data['endDate']));

        $this->establishmentRepository->save($establishment, true);

        return $establishment;
    }
}