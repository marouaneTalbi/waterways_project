<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Repository\UserRepository;
use App\State\UserPasswordHasher;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\OpenApi\Model\RequestBody;
use App\Controller\AddFavoriteController;
use App\Controller\UserController;
use App\State\UserAddFavoriteProcessor;
use Symfony\Config\ApiPlatform\SwaggerConfig;
use App\Controller\GetFavoriteController;
use App\Controller\UserGetController;
use App\Controller\UserBoatEstablishmentController;
use App\Controller\UserSearchController;

#[ApiResource(
    operations: [
        new Get(
            name: 'searchProvider',
            uriTemplate: '/user/search',
            controller: UserSearchController::class
        ),
        new GetCollection(
            security: "is_granted('ROLE_ADMIN')",
            normalizationContext: ['groups' => ['user:read', 'establishment:read']],
        ),
        new Post(
            processor: UserPasswordHasher::class,
            validationContext: ['groups' => ['Default', 'user:create']]
        ),
        new Get(
            security: "is_granted('ROLE_ADMIN')",
            normalizationContext: ['groups' => ['user:read']],
        ),
        new Put(
            processor: UserPasswordHasher::class,
            normalizationContext: ['groups' => ['user:read']],
            securityMessage: "Only authenticated users can modify users."
        ),
        new Patch(
            processor: UserPasswordHasher::class,
            security: "is_granted('ROLE_ADMIN')",
            normalizationContext: ['groups' => ['user:read']],
            securityMessage: "Only authenticated users can modify users."
        ),
        new Delete(
            security: "is_granted('ROLE_ADMIN')",
            securityMessage: "Only authenticated users can delete users."
        ),
        new Get(
            name: 'getUser',
            uriTemplate: '/user',
            processor: UserGetController::class,
            normalizationContext: ['groups' => ['user:read']]
        ), 
        new Get(
            name: 'getCurrentUser',
            uriTemplate: '/user/{id}',
            normalizationContext: ['groups' => ['user:read']]
        ),
    ],
    normalizationContext: ['groups' => ['user:read', 'establishment:read']],
    denormalizationContext: ['groups' => ['user:create', 'user:update']],
)]
#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[UniqueEntity('email')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{

    #[ORM\Id]
    #[ORM\Column(type: 'integer')]
    #[ORM\GeneratedValue]
    #[Groups(['user:read'])]
    private ?int $id = null;

    #[Assert\NotBlank]
    #[Assert\Email(
        message: 'The email "{{ value }}" is not a valid email.',
        mode: 'strict'
    )]
    #[Groups(['user:read', 'user:create', 'user:update','media_object:read'])]
    #[ORM\Column(length: 180, unique: true)]
    private ?string $email = null;

    #[ORM\Column(type: 'json')]
    #[Groups(['user:read'])]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    #[Groups(['user:create'])]
    #[Assert\Regex(
        pattern: '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/',
        message: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).'
    )]
    private ?string $password = null;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    private ?string $token = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['user:read', 'user:create', 'user:update','media_object:read'])]
    private ?string $firstname = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['user:create', 'user:update','user:read','media_object:read'])]
    private ?string $lastname = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['user:create', 'user:update','user:read'])]
    private ?\DateTimeImmutable $createdAt = null;

    #[Assert\NotBlank(groups: ['user:create'])]
    #[Groups(['user:create', 'user:update'])]
    #[Assert\Regex(
        pattern: '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/',
        message: 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&).'
    )]
    private ?string $plainPassword = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['user:create', 'user:update','user:read','media_object:read'])]
    private ?bool $isVerified = false;

    #[ORM\Column(nullable: true)]
    #[Groups(['user:read', 'user:update'])]
    private ?string $phone = null;

    #[ORM\OneToMany(mappedBy: 'createdby', targetEntity: Establishment::class)]
    #[Groups(['user:read'])]
    private Collection $establishments;

    #[ORM\OneToMany(mappedBy: 'user_id', targetEntity: Notification::class)]
    private Collection $notifications;

    #[ORM\ManyToMany(targetEntity: Boat::class, inversedBy: 'usersFavorites', cascade: ['persist'])]
    private Collection $favorite;

    public function __construct()
    {
        $this->establishments = new ArrayCollection();
        $this->notifications = new ArrayCollection();
        $this->reservations = new ArrayCollection();
        $this->favorite = new ArrayCollection();
        $this->notes = new ArrayCollection();
        $this->comments = new ArrayCollection();
    }

    #[ORM\OneToMany(mappedBy: 'consumer', targetEntity: Reservation::class)]
    private Collection $reservations;

    #[ORM\OneToMany(mappedBy: 'createdby', targetEntity: Note::class)]
    private Collection $notes;

    #[ORM\OneToMany(mappedBy: 'createdby', targetEntity: Comment::class, orphanRemoval: true)]
    private Collection $comments;



    public function getPlainPassword(): ?string
    {
        return $this->plainPassword;
    }

    public function setPlainPassword(?string $plainPassword): void
    {
        $this->plainPassword = $plainPassword;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }


    public function getVerified(): ?string
    {
        return $this->isVerified;
    }

    public function setVerified(string $isVerified): static
    {
        $this->isVerified = $isVerified;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getToken(): ?string
    {
        return $this->token;
    }

    public function setToken(string $token): static
    {
        $this->token = $token;

        return $this;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(?string $firstname): static
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(?string $lastname): static
    {
        $this->lastname = $lastname;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(?\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = new \DateTimeImmutable();;

        return $this;
    }

    public function isIsVerified(): ?bool
    {
        return $this->isVerified;
    }

    public function setIsVerified(?bool $isVerified): static
    {
        $this->isVerified = $isVerified;

        return $this;
    }


    public function getPhone(): ?string
    {
        return $this->phone;
    }

    public function setPhone(?string $phone): static
    {
        $this->phone = $phone;


        return $this;
    }

    /**
     * @return Collection<int, Establishment>
     */
    public function getEstablishments(): Collection
    {
        return $this->establishments;
    }

    public function addEstablishment(Establishment $establishment): static
    {
        if (!$this->establishments->contains($establishment)) {
            $this->establishments->add($establishment);
            $establishment->setCreatedby($this);
        }

        return $this;
    }

    public function removeEstablishment(Establishment $establishment): static
    {
        if ($this->establishments->removeElement($establishment)) {
            // set the owning side to null (unless already changed)
            if ($establishment->getCreatedby() === $this) {
                $establishment->setCreatedby(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Notification>
     */
    public function getNotifications(): Collection
    {
        return $this->notifications;
    }

    public function addNotification(Notification $notification): static
    {
        if (!$this->notifications->contains($notification)) {
            $this->notifications->add($notification);
            $notification->setUserId($this);
        }

        return $this;
    }

    public function removeNotification(Notification $notification): static
    {
        if ($this->notifications->removeElement($notification)) {
            // set the owning side to null (unless already changed)
            if ($notification->getUserId() === $this) {
                $notification->setUserId(null);
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
            $reservation->setConsumer($this);
        }

        return $this;
    }

    public function removeReservation(Reservation $reservation): static
    {
        if ($this->reservations->removeElement($reservation)) {
            // set the owning side to null (unless already changed)
            if ($reservation->getConsumer() === $this) {
                $reservation->setConsumer(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Boat>
     */
    public function getFavorite(): Collection
    {
        return $this->favorite;
    }

    public function addFavorite(Boat $favorite): static
    {
        if (!$this->favorite->contains($favorite)) {
            $this->favorite->add($favorite);
        }

        return $this;
    }
    
    /*
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
            $note->setCreatedby($this);
        }

        return $this;
    }

    public function removeFavorite(Boat $favorite): static
    {
        $this->favorite->removeElement($favorite);

        return $this;
    }

    public function removeNote(Note $note): static
    {
        if ($this->notes->removeElement($note)) {
            // set the owning side to null (unless already changed)
            if ($note->getCreatedby() === $this) {
                $note->setCreatedby(null);
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
            $comment->setCreatedby($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): static
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getCreatedby() === $this) {
                $comment->setCreatedby(null);
            }
        }

        return $this;
    }


}
