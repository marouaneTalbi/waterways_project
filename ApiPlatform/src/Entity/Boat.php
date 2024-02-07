<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\ApiProperty;
use App\Repository\BoatRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\HttpFoundation\File\File;
use App\Controller\BoatController;
use App\Controller\BoatSearchController;
use App\State\SearchStateProvider;
use Symfony\Component\Validator\Constraints as Assert;

#[Vich\Uploadable]
#[ORM\Entity(repositoryClass: BoatRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            security: "is_granted('ROLE_ADMIN')",
            normalizationContext: ['groups' => ['boat:read']],
            paginationEnabled: false
        ),
        new Post(
            uriTemplate: '/addboat',
            security: "is_granted('ROLE_ADMIN')",
            controller: BoatController::class,
            deserialize: false, 
            // normalizationContext: ['groups' => ['boat:create']],
        ),
        new GetCollection(
            name: 'search',
            uriTemplate: '/search',
            controller: BoatSearchController::class,
        )
        // new Post(
        //     name: 'search',
        //     uriTemplate: '/search',
        //     processor: SearchStateProvider::class,
        //     openapiContext: [
        //         'requestBody' => [
        //             'content' => [
        //                 'application/json' => [
        //                     'schema' => [
        //                         'type' => 'object',
        //                         'properties' => [
        //                             'search' => ['type' => 'string'],
        //                             'search' => ['type' => 'string'],
        //                             'location' => ['type' => 'string'],
        //                         ],
        //                     ],
        //                 ],
        //             ],
        //         ],
        //     ],
        // )
     /*   new Get(
            security: "is_granted('ROLE_ADMIN')",
            normalizationContext: ['groups' => ['boat:read']],
        ),
        /*
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
    normalizationContext: ['groups' => ['boat:read', 'media_object:read']],
    denormalizationContext: ['groups' => ['boat:create', 'boat:update']],
)]
class Boat
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['boat:read', 'boat:create', 'media_object:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['boat:read', 'boat:create', 'boat:update', 'media_object:read'], 'search')]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Groups(['boat:read', 'boat:create', 'boat:update', 'media_object:read'])]
    private ?string $modele = null;

    #[ORM\Column]
    #[Groups(['boat:read', 'boat:create', 'boat:update', 'media_object:read'])]
    private ?float $size = null;

    #[ORM\Column]
    #[Groups(['boat:read', 'boat:create', 'boat:update', 'media_object:read'])]
    private ?int $capacity = null;

    #[ORM\ManyToOne(inversedBy: 'boats')]
    #[Groups(['boat:read', 'boat:create', 'boat:update', 'media_object:read'])]
    private ?Establishment $establishment = null;

    #[ORM\Column]
    #[Groups(['boat:read', 'boat:create', 'boat:update', 'media_object:read'])]
    private ?int $minTime = 0;

    #[ORM\OneToMany(mappedBy: 'idBoat', targetEntity: Slot::class, orphanRemoval: true)]
    private Collection $slots;

    #[ORM\OneToMany(mappedBy: 'boat', targetEntity: Reservation::class)]
    private Collection $reservations;

    #[Vich\UploadableField(mapping: 'boat', fileNameProperty: 'image')]
    #[Assert\File(
        maxSize: '1024k',
        mimeTypes: ['image/jpeg', 'image/png'],
        mimeTypesMessage: 'Veuillez uploader une image valide (JPEG ou PNG).',
    )]
    public ?File $file = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['media_object:read','boat:read', 'boat:create', 'boat:update'])]
    private ?string $image = null;

    public function __construct()
    {
        $this->slots = new ArrayCollection();
        $this->reservations = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;

    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getModele(): ?string
    {
        return $this->modele;
    }

    public function setModele(string $modele): static
    {
        $this->modele = $modele;

        return $this;
    }

    public function getSize(): ?float
    {
        return $this->size;
    }

    public function setSize(float $size): static
    {
        $this->size = $size;

        return $this;
    }

    public function getCapacity(): ?int
    {
        return $this->capacity;
    }

    public function setCapacity(int $capacity): static
    {
        $this->capacity = $capacity;

        return $this;
    }

    public function getEstablishment(): ?Establishment
    {
        return $this->establishment;
    }

    public function setEstablishment(?Establishment $establishment): static
    {
        $this->establishment = $establishment;

        return $this;
    }

    public function getMinTime(): ?int
    {
        return $this->minTime;
    }

    public function setMinTime(int $minTime): static
    {
        $this->minTime = $minTime;

        return $this;
    }

    /**
     * @return Collection<int, Slot>
     */
    public function getSlots(): Collection
    {
        return $this->slots;
    }

    public function addSlot(Slot $slot): static
    {
        if (!$this->slots->contains($slot)) {
            $this->slots->add($slot);
            $slot->setIdBoat($this);
        }

        return $this;
    }

    public function removeSlot(Slot $slot): static
    {
        if ($this->slots->removeElement($slot)) {
            // set the owning side to null (unless already changed)
            if ($slot->getIdBoat() === $this) {
                $slot->setIdBoat(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Reservation>
     */
    public function getReservations(): Collection
    {
        return $this->reservations;
    }

    public function addReservation(Reservation $reservation): static
    {
        if (!$this->reservations->contains($reservation)) {
            $this->reservations->add($reservation);
            $reservation->setBoat($this);
        }

        return $this;
    }

    public function removeReservation(Reservation $reservation): static
    {
        if ($this->reservations->removeElement($reservation)) {
            // set the owning side to null (unless already changed)
            if ($reservation->getBoat() === $this) {
                $reservation->setBoat(null);
            }
        }

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): static
    {
        $this->image = $image;

        return $this;
    }


    /**
     * Get the value of file
     */ 
    public function getFile()
    {
        return $this->file;
    }

    /**
     * Set the value of file
     *
     * @return  self
     */ 
    public function setFile($file)
    {
        $this->file = $file;

        return $this;
    }

    // ça nous permet de recuperet les chemain des photos
    #[Groups(['boat:read'])]
    public function getImageUrl(): ?string
    {
        if ($this->image) {
            return '/uploads/boat/' . $this->image;
        }

        return null;
    }
}
