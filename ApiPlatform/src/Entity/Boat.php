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
use App\Controller\AddFavoriteController;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\HttpFoundation\File\File;
use App\Controller\BoatController;
use App\Controller\BoatSearchController;
use App\Controller\GetFavoriteController;
use App\State\SearchStateProvider;
use Symfony\Component\Validator\Constraints as Assert;
use App\Controller\RemoveFavoriteController;

#[ORM\Entity(repositoryClass: BoatRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(
            uriTemplate: '/boat/favorite',
            normalizationContext: ['groups' => ['user:favorite']],
            controller: getFavoriteController::class
        ),
        new Delete(
            uriTemplate: 'boat/{id}/removeFavorite',
            controller: RemoveFavoriteController::class
        ),
        new GetCollection(
            security: "is_granted('ROLE_ADMIN')",
            normalizationContext: ['groups' => ['boat:read']],
            paginationEnabled: false
        ),
        new Post(
            uriTemplate: '/addboat',
            security: "is_granted('ROLE_PROVIDER')",
            controller: BoatController::class,
            deserialize: false, 
            // normalizationContext: ['groups' => ['boat:create']],
        ),
        new GetCollection(
            name: 'search',
            uriTemplate: '/search',
            controller: BoatSearchController::class,
        ),
        new Get(
            uriTemplate: '/boat/{id}',
            security: "is_granted('ROLE_PROVIDER')",
            normalizationContext: ['groups' => ['boat:read', 'user:read']],
        ),
        new Post(
            uriTemplate: '/boat/{id}/addFavorite',
            normalizationContext: ['groups' => ['boat:read', 'user:read']],
            controller: AddFavoriteController::class,
        ),
        new POST(
            uriTemplate: '/boat/{id}',
            security: "is_granted('ROLE_ADMIN')",
            controller: BoatController::class,
            deserialize: false, 
        )
    ],
    normalizationContext: ['groups' => ['boat:read', 'media_object:read']],
    denormalizationContext: ['groups' => ['boat:create', 'boat:update']],
)]
#[Vich\Uploadable]
class Boat
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['boat:read', 'boat:create', 'media_object:read', 'user:favorite', 'establishment:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['boat:read', 'boat:create', 'boat:update', 'media_object:read', 'user:favorite', 'user:read'], 'search')]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Groups(['boat:read', 'boat:create', 'boat:update', 'media_object:read', 'user:favorite'])]
    private ?string $modele = null;

    #[ORM\Column]
    #[Groups(['boat:read', 'boat:create', 'boat:update', 'media_object:read', 'user:favorite'])]
    private ?float $size = null;

    #[ORM\Column]
    #[Groups(['boat:read', 'boat:create', 'boat:update', 'media_object:read', 'user:favorite'])]
    private ?int $capacity = null;

    #[ORM\ManyToOne(inversedBy: 'boats')]
    #[Groups(['boat:read', 'boat:create', 'boat:update', 'media_object:read', 'establishment:read'])]
    private ?Establishment $establishment = null;

    #[ORM\Column]
    #[Groups(['boat:read', 'boat:create', 'boat:update', 'media_object:read', 'user:favorite'])]
    private ?int $minTime = 0;

    #[ORM\OneToMany(mappedBy: 'idBoat', targetEntity: Slot::class, orphanRemoval: true)]
    private Collection $slots;

    #[ORM\OneToMany(mappedBy: 'boat', targetEntity: Reservation::class)]
    private Collection $reservations;

    #[ORM\Column(length: 255)]
    #[Groups(['boat:read', 'boat:create', 'boat:update', 'user:favorite', 'establishment:read'])]
    private ?string $address = null;

    #[ORM\Column(length: 255)]
    #[Groups(['boat:read', 'boat:create', 'boat:update', 'user:favorite', 'establishment:read'])]
    private ?string $city = null;

    #[Vich\UploadableField(mapping: 'boat', fileNameProperty: 'image')]
    #[Assert\File(
        maxSize: '1024k',
        mimeTypes: ['image/jpeg', 'image/png'],
        mimeTypesMessage: 'Veuillez uploader une image valide (JPEG ou PNG).',
    )]
    public ?File $file = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['media_object:read','boat:read', 'boat:create', 'boat:update', 'user:favorite'])]
    private ?string $image = null;

    #[ORM\ManyToMany(targetEntity: User::class, mappedBy: 'favorite')]
    #[Groups(['boat:read', 'boat:create', 'boat:update'])]
    private Collection $usersFavorites;
    
    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['media_object:read','boat:read', 'boat:create', 'boat:update'])]
    private ?string $description = null;

    #[ORM\OneToMany(mappedBy: 'boat', targetEntity: Note::class)]
    private Collection $createdBy;

    #[ORM\OneToMany(mappedBy: 'boat', targetEntity: Comment::class, orphanRemoval: true)]
    private Collection $comments;

    #[ORM\Column(nullable: true)]
    #[Groups(['media_object:read','boat:read', 'boat:create', 'boat:update', 'user:read'])]
    private ?float $price = 0;

    #[ORM\OneToMany(mappedBy: 'boat', targetEntity: Note::class)]
    #[Groups(['user:read'])]
    private Collection $notes;

    public function __construct()
    {
        $this->slots = new ArrayCollection();
        $this->reservations = new ArrayCollection();
        $this->usersFavorites = new ArrayCollection();
        $this->createdBy = new ArrayCollection();
        $this->comments = new ArrayCollection();
        $this->notes = new ArrayCollection();
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

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): static
    {
        $this->address = $address;

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

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): static
    {
        $this->city = $city;

        return $this;
    }

    /**
     * @return Collection<int, Note>
     */
    public function getCreatedBy(): Collection
    {
        return $this->createdBy;
    }

    public function addCreatedBy(Note $createdBy): static
    {
        if (!$this->createdBy->contains($createdBy)) {
            $this->createdBy->add($createdBy);
            $createdBy->setBoat($this);
        }
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


    public function removeCreatedBy(Note $createdBy): static
    {
        if ($this->createdBy->removeElement($createdBy)) {
            // set the owning side to null (unless already changed)
            if ($createdBy->getBoat() === $this) {
                $createdBy->setBoat(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Comment>
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): static
    {
        if (!$this->comments->contains($comment)) {
            $this->comments->add($comment);
            $comment->setBoat($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): static
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getBoat() === $this) {
                $comment->setBoat(null);
            }
        }

        return $this;
    }

    // ça nous permet de recuperet les chemain des photos
    #[Groups(['boat:read'])]
    public function getImageUrl(): ?string
    {
        if ($this->image) {
            return '/uploads/boat/' . $this->image;
        }

        return '';
    }

    /**
     * @return Collection<int, User>
     */
    public function getUsersFavorites(): Collection
    {
        return $this->usersFavorites;
    }

    public function addUsersFavorite(User $usersFavorite): static
    {
        if (!$this->usersFavorites->contains($usersFavorite)) {
            $this->usersFavorites->add($usersFavorite);
            $usersFavorite->addFavorite($this);
        }
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function removeUsersFavorite(User $usersFavorite): static
    {
        if ($this->usersFavorites->removeElement($usersFavorite)) {
            $usersFavorite->removeFavorite($this);
        }

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(?float $price): static
    {
        $this->price = $price;

        return $this;
    }

    /**
     * @return Collection<int, Note>
     */
    public function getNotes(): Collection
    {
        return $this->notes;
    }

    public function addNote(Note $note): static
    {
        if (!$this->notes->contains($note)) {
            $this->notes->add($note);
            $note->setBoat($this);
        }

        return $this;
    }

    public function removeNote(Note $note): static
    {
        if ($this->notes->removeElement($note)) {
            // set the owning side to null (unless already changed)
            if ($note->getBoat() === $this) {
                $note->setBoat(null);
            }
        }

        return $this;
    }
}
