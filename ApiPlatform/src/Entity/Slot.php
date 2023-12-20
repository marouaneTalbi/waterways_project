<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\EstablishmentRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use App\Repository\SlotRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use App\Controller\SlotController;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: SlotRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            security: "is_granted('ROLE_ADMIN')",
            normalizationContext: ['groups' => ['slots:read']],
        ),
        new Post(
            name: 'Slots',
            uriTemplate: '/slots',
            normalizationContext: ['groups' => ['slots:create']],

        ),
        new Get(
            uriTemplate: '/slots/boats/{boatId}',
            security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_PROVIDER')",
            normalizationContext: ['groups' => ['slots:read']],
        ),
        /*   new Get(
               security: "is_granted('ROLE_ADMIN')",
               normalizationContext: ['groups' => ['establishment:read']],
           ),
           new Put(
               security: "is_granted('ROLE_ADMIN')",
               securityMessage: "Only authenticated users can modify users."
           ),
           new Patch(
               security: "is_granted('ROLE_ADMIN')",
               securityMessage: "Only authenticated users can modify users."
           ),
           new Delete(
               security: "is_granted('ROLE_ADMIN')",
               securityMessage: "Only authenticated users can delete users."
           ),*/

    ],
    normalizationContext: ['groups' => ['slots:read']],
    denormalizationContext: ['groups' => ['slots:create', 'slots:update']],

)]
#[ApiResource]
class Slot
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['slots:read', 'slots:create'])]
    private ?int $id = null;
    #[ORM\ManyToOne(inversedBy: 'slots')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['slots:read', 'slots:create', 'slots:update'])]
    private ?Boat $boat = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['slots:read', 'slots:create', 'slots:update'])]
    private ?\DateTimeInterface $startBookingDate = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['slots:read', 'slots:create', 'slots:update'])]
    private ?\DateTimeInterface $endBookingDate = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getBoat(): ?Boat
    {
        return $this->boat;
    }

    public function setBoat(?Boat $boat): static
    {
        $this->boat = $boat;

        return $this;
    }

    public function getStartBookingDate(): ?\DateTimeInterface
    {
        return $this->startBookingDate;
    }

    public function setStartBookingDate(\DateTimeInterface $startBookingDate): static
    {
        $this->startBookingDate = $startBookingDate;

        return $this;
    }

    public function getEndBookingDate(): ?\DateTimeInterface
    {
        return $this->endBookingDate;
    }

    public function setEndBookingDate(\DateTimeInterface $endBookingDate): static
    {
        $this->endBookingDate = $endBookingDate;

        return $this;
    }
}
