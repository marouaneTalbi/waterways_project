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

#[AsController]
final class BoatController extends AbstractController
{
    public function __invoke(Request $request, EntityManagerInterface $entityManager, UploaderHelper $uploaderHelper): Boat
    {

        $formData = $request->request->all();
        $boat = new Boat();
        
        $boat->setName($formData['name']);
        $boat->setModele($formData['modele']);
        $boat->setSize((float)$formData['size']);
        $boat->setCapacity((float)$formData['capacity']);
        $boat->setMinTime((float)$formData['minTime']);
        $establishment = $entityManager->getRepository(Establishment::class)->find($formData['establishment']);
        $boat->setEstablishment($establishment);
        
        $imageFile = $request->files->get('image');
        if ($imageFile) {
            $originalFileName = $imageFile->getClientOriginalName();
            $boat->setImage($originalFileName);
            $boat->file = $imageFile;

        }
        return $boat;
    }
}