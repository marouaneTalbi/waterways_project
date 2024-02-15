<?php

namespace App\Model;

class Translation
{
    public function __construct(
        public string $key,
        public string $translation
    ) {}
}