<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240212115152 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE note (id INT NOT NULL, boat_id INT NOT NULL, createdby_id INT NOT NULL, proprete INT NOT NULL, confort INT NOT NULL, performance INT NOT NULL, equipement INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_CFBDFA14A1E84A29 ON note (boat_id)');
        $this->addSql('CREATE INDEX IDX_CFBDFA14F0B5AF0B ON note (createdby_id)');
        $this->addSql('ALTER TABLE note ADD CONSTRAINT FK_CFBDFA14A1E84A29 FOREIGN KEY (boat_id) REFERENCES boat (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE note ADD CONSTRAINT FK_CFBDFA14F0B5AF0B FOREIGN KEY (createdby_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE note DROP CONSTRAINT FK_CFBDFA14A1E84A29');
        $this->addSql('ALTER TABLE note DROP CONSTRAINT FK_CFBDFA14F0B5AF0B');
        $this->addSql('DROP TABLE note');
    }
}
