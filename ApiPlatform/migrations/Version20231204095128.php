<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231204095128 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE kabis ADD status INT NOT NULL');
        $this->addSql('ALTER TABLE kabis DROP title');
        $this->addSql('ALTER TABLE kabis ADD CONSTRAINT FK_9D3ACE01A76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_9D3ACE01A76ED395 ON kabis (user_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE kabis DROP CONSTRAINT FK_9D3ACE01A76ED395');
        $this->addSql('DROP INDEX IDX_9D3ACE01A76ED395');
        $this->addSql('ALTER TABLE kabis ADD title VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE kabis DROP status');
    }
}
