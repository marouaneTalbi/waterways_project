<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use App\Repository\ReservationRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ReservationRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            security: "is_granted('ROLE_ADMIN')",
            normalizationContext: ['groups' => ['reservation:read']],
            paginationEnabled: false,
        /*paginationItemsPerPage: 100,*/
        ),
        new Post(
            name: 'Reservation',
            uriTemplate: '/reservation',
            normalizationContext: ['groups' => ['reservation:create']],

        ),
        new Get(
            security: "is_granted('ROLE_ADMIN') or is_granted('ROLE_PROVIDER')",
            normalizationContext: ['groups' => ['reservation:read']],
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
    normalizationContext: ['groups' => ['reservation:read']],
    denormalizationContext: ['groups' => ['reservation:create', 'reservation:update']],

)]
class Reservation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'reservations')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['reservation:read', 'reservation:create'])]
    private ?Boat $boat = null;

    #[ORM\ManyToOne(inversedBy: 'reservations')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['reservation:read', 'reservation:create'])]
    private ?User $consumer = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['reservation:read', 'reservation:create'])]
    private ?\DateTimeInterface $reservationDate = null;

    #[ORM\ManyToOne(inversedBy: 'reservations')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['reservation:read', 'reservation:create'])]
    private ?Slot $slots = null;

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

    public function getConsumer(): ?User
    {
        return $this->consumer;
    }

    public function setConsumer(?User $consumer): static
    {
        $this->consumer = $consumer;

        return $this;
    }

    public function getReservationDate(): ?\DateTimeInterface
    {
        return $this->reservationDate;
    }

    public function setReservationDate(\DateTimeInterface $reservationDate): static
    {
        $this->reservationDate = $reservationDate;

        return $this;
    }

    public function getSlots(): ?Slot
    {
        return $this->slots;
    }

    public function setSlots(?Slot $slots): static
    {
        $this->slots = $slots;

        return $this;
    }
}
