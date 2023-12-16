<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
<<<<<<<< HEAD:ApiPlatform/migrations/Version20231209153838.php
final class Version20231209153838 extends AbstractMigration
========
final class Version20231211222606 extends AbstractMigration
>>>>>>>> dev:ApiPlatform/migrations/Version20231211222606.php
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
<<<<<<<< HEAD:ApiPlatform/migrations/Version20231209153838.php
        $this->addSql('ALTER TABLE establishment ADD city VARCHAR(100)');
========
        $this->addSql('ALTER TABLE establishment ADD createdby INT NOT NULL');
        $this->addSql('ALTER TABLE establishment ADD CONSTRAINT FK_DBEFB1EEF0B5AF0B FOREIGN KEY (createdby) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_DBEFB1EEF0B5AF0B ON establishment (createdby)');
>>>>>>>> dev:ApiPlatform/migrations/Version20231211222606.php
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
<<<<<<<< HEAD:ApiPlatform/migrations/Version20231209153838.php
        $this->addSql('ALTER TABLE establishment DROP city');
========
        $this->addSql('ALTER TABLE establishment DROP CONSTRAINT FK_DBEFB1EEF0B5AF0B');
        $this->addSql('DROP INDEX IDX_DBEFB1EEF0B5AF0B');
        $this->addSql('ALTER TABLE establishment DROP createdby');
>>>>>>>> dev:ApiPlatform/migrations/Version20231211222606.php
    }
}
