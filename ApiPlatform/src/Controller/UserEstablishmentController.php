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
class UserEstablishmentController extends AbstractController
{
    public function __invoke(Request $request, EntityManagerInterface $entityManager,$id,SerializerInterface $serializer,): JsonResponse
    {

        $establishments = $entityManager->getRepository(Establishment::class)->findOneByIdUser($id);

        $data = $serializer->serialize($establishments, 'json', ['groups' => 'establishment:read']);
        
        return new JsonResponse($data, Response::HTTP_OK, [], true);
    }
}