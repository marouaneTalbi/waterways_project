<?php
namespace App\Controller;
use App\Entity\Boat;
use App\Entity\Establishment;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Vich\UploaderBundle\Templating\Helper\UploaderHelper;
use Doctrine\ORM\EntityManagerInterface;
use App\Service\MultipartFormDataParser;
use Symfony\Component\Serializer\SerializerInterface;
use App\Repository\UserRepository;
use App\Repository\BoatRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

#[AsController]
final class ProviderBoatsController extends AbstractController
{
    private $boatRepository;
    private $userRepository;

    public function __construct(
        BoatRepository $boatRepository,
        UserRepository $userRepository,
    ) {
        $this->boatRepository = $boatRepository;
        $this->userRepository = $userRepository;
    }

    public function __invoke(EntityManagerInterface $entityManager, SerializerInterface $serializer, $id): JsonResponse
    {
        $boats = $entityManager->getRepository(Boat::class)->findByEstablishment($id);

        $data = $serializer->serialize($boats, 'json', ['groups' => 'boat:read']);

        return new JsonResponse($data, Response::HTTP_OK, [], true);
    }
}