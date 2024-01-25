<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ReservationRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ReservationRepository::class)]
#[ApiResource]
class Reservation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'reservations')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Boat $boat = null;

    #[ORM\ManyToOne(inversedBy: 'reservations')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $consumer = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $ReservationDate = null;

    #[ORM\ManyToOne(inversedBy: 'reservations')]
    #[ORM\JoinColumn(nullable: false)]
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
        return $this->ReservationDate;
    }

    public function setReservationDate(\DateTimeInterface $ReservationDate): static
    {
        $this->ReservationDate = $ReservationDate;

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
