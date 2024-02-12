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
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;


#[AsController]
class UserBoatEstablishmentController extends AbstractController
{
    public function __invoke(Request $request, EntityManagerInterface $entityManager,$id,SerializerInterface $serializer,): JsonResponse
    {
        $establishments = $entityManager->getRepository(Establishment::class)->findOneByIdUser($id);
        $establishmentBoats = [];
        foreach ($establishments as $establishment) {
            $boats = $entityManager->getRepository(Boat::class)->findBy(['establishment' => $establishment]);
            foreach ($boats as $boat) {
                $establishmentBoats[] = $boat;
            }
        }
        
        $data = $serializer->serialize($establishmentBoats, 'json', ['groups' => 'boat:read']);

        return new JsonResponse($data, Response::HTTP_OK, [], true);
    }
}