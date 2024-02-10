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

#[AsController]
final class BoatController extends AbstractController
{
    public function __invoke(Request $request, EntityManagerInterface $entityManager,$id=null): Boat
    {
        $formData = $request->request->all();

        if($id) {
            $boat = $entityManager->getRepository(Boat::class)->find($id);
        } else {
            $boat = new Boat();
        }

        $boat->setName($formData['name']);
        $boat->setModele($formData['modele']);
        $boat->setSize((float)$formData['size']);
        $boat->setCapacity((float)$formData['capacity']);
        $boat->setMinTime((float)$formData['minTime']);
        $establishment = $entityManager->getRepository(Establishment::class)->find($formData['establishment']);
        $boat->setEstablishment($establishment);
        $boat->setCity($formData['city']);
        $boat->setDescription($formData['description']);
        $boat->setAddress($formData['address']);
        $boat->setPrice((float)$formData['price']);
        $imageFile = $request->files->get('image');
        if ($imageFile) {
            $originalFileName = $imageFile->getClientOriginalName();
            $boat->setImage($originalFileName);
            $boat->file = $imageFile;
        }
        return $boat;
    }
}