<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231128232510 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE kabis_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE kabis (id INT NOT NULL, user_id INT NOT NULL, name VARCHAR(255) NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, status INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_9D3ACE01A76ED395 ON kabis (user_id)');
        $this->addSql('COMMENT ON COLUMN kabis.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('ALTER TABLE kabis ADD CONSTRAINT FK_9D3ACE01A76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE kabis_id_seq CASCADE');
        $this->addSql('ALTER TABLE kabis DROP CONSTRAINT FK_9D3ACE01A76ED395');
        $this->addSql('DROP TABLE kabis');
    }
}
