<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\NoteRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: NoteRepository::class)]
#[ApiResource]
class Note
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $proprete = null;

    #[ORM\Column]
    private ?int $confort = null;

    #[ORM\Column]
    private ?int $performance = null;

    #[ORM\Column]
    private ?int $equipement = null;

    #[ORM\ManyToOne(inversedBy: 'createdBy')]
    #[ORM\JoinColumn(nullable: false)]
    private ?boat $boat = null;

    #[ORM\ManyToOne(inversedBy: 'notes')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $createdby = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getProprete(): ?int
    {
        return $this->proprete;
    }

    public function setProprete(int $proprete): static
    {
        $this->proprete = $proprete;

        return $this;
    }

    public function getConfort(): ?int
    {
        return $this->confort;
    }

    public function setConfort(int $confort): static
    {
        $this->confort = $confort;

        return $this;
    }

    public function getPerformance(): ?int
    {
        return $this->performance;
    }

    public function setPerformance(int $performance): static
    {
        $this->performance = $performance;

        return $this;
    }

    public function getEquipement(): ?int
    {
        return $this->equipement;
    }

    public function setEquipement(int $equipement): static
    {
        $this->equipement = $equipement;

        return $this;
    }

    public function getBoat(): ?boat
    {
        return $this->boat;
    }

    public function setBoat(?boat $boat): static
    {
        $this->boat = $boat;

        return $this;
    }

    public function getCreatedby(): ?User
    {
        return $this->createdby;
    }

    public function setCreatedby(?User $createdby): static
    {
        $this->createdby = $createdby;

        return $this;
    }
}
