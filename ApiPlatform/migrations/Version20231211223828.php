<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20231211223828 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE establishment DROP CONSTRAINT fk_dbefb1ee9d86650f');
        $this->addSql('ALTER TABLE establishment DROP CONSTRAINT FK_DBEFB1EEF0B5AF0B');
        $this->addSql('DROP INDEX idx_dbefb1ee9d86650f');
        $this->addSql('DROP INDEX IDX_DBEFB1EEF0B5AF0B');
        $this->addSql('ALTER TABLE establishment ADD createdby_id INT NOT NULL');
        $this->addSql('ALTER TABLE establishment DROP user_id_id');
        $this->addSql('ALTER TABLE establishment DROP createdby');
        $this->addSql('ALTER TABLE establishment ADD CONSTRAINT FK_DBEFB1EEF0B5AF0B FOREIGN KEY (createdby_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_DBEFB1EEF0B5AF0B ON establishment (createdby_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE establishment DROP CONSTRAINT fk_dbefb1eef0b5af0b');
        $this->addSql('DROP INDEX idx_dbefb1eef0b5af0b');
        $this->addSql('ALTER TABLE establishment ADD createdby INT NOT NULL');
        $this->addSql('ALTER TABLE establishment RENAME COLUMN createdby_id TO user_id_id');
        $this->addSql('ALTER TABLE establishment ADD CONSTRAINT fk_dbefb1ee9d86650f FOREIGN KEY (user_id_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE establishment ADD CONSTRAINT fk_dbefb1eef0b5af0b FOREIGN KEY (createdby) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX idx_dbefb1ee9d86650f ON establishment (user_id_id)');
        $this->addSql('CREATE INDEX idx_dbefb1eef0b5af0b ON establishment (createdby)');
    }
}
