<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\SlotRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SlotRepository::class)]
#[ApiResource]
class Slot
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'slots')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Boat $idBoat = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $startBookingDate = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    private ?\DateTimeInterface $endBookingDate = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getIdBoat(): ?Boat
    {
        return $this->idBoat;
    }

    public function setIdBoat(?Boat $idBoat): static
    {
        $this->idBoat = $idBoat;

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
