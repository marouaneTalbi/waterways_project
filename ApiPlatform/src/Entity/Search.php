<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\GetCollection;
use App\State\SearchStateProvider;

#[ApiResource(
    operations: [
        // new Post(
        //     // name: 'search',
        //     // uriTemplate: '/search',
        //     // processor: SearchStateProvider::class,
        // ),
    ],
    processor: SearchStateProvider::class
)]

class Search
{
    public function __construct(
        // #[ApiProperty(identifier: true)]
        private ?string $location,

        // #[ApiProperty(identifier: true)]
        private ?string $people,

        // #[ApiProperty(identifier: true)]
        private ?string $search
    ) {

    }

    public function getLocation(): ?string
    {
        return $this->location;
    }

    public function setLocation(?string $location): void
    {
        $this->location = $location;
    }

    public function getPeople(): ?string
    {
        return $this->people;
    }

    public function setPeople(?string $people): void
    {
        $this->people = $people;
    }

    public function getSearch(): ?string
    {
        return $this->search;
    }

    public function setSearch(?string $search): void
    {
        $this->search = $search;
    }
}
