/*
  Warnings:

  - You are about to alter the column `tanggal_post` on the `diskusi` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `waktu` on the `log_aktivitas` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `tanggal_upload` on the `materi_pelajaran` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `waktu` on the `notifikasi` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `tanggal_kumpul` on the `pengumpulan_tugas` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `tanggal_lahir` on the `siswa` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deadline` on the `tugas` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `jenis_ptk` to the `admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode_pos` to the `admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pangkat_golongan` to the `admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_pegawai` to the `admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal_lahir` to the `admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tempat` to the `admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kode_pos` to the `guru` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pangkat_golongan` to the `guru` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_pegawai` to the `guru` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal_lahir` to the `guru` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tempat` to the `guru` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_admin` to the `mata_pelajaran` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `admin` ADD COLUMN `jenis_ptk` VARCHAR(100) NOT NULL,
    ADD COLUMN `kode_pos` INTEGER NOT NULL,
    ADD COLUMN `pangkat_golongan` VARCHAR(20) NOT NULL,
    ADD COLUMN `status_pegawai` VARCHAR(100) NOT NULL,
    ADD COLUMN `tanggal_lahir` DATETIME NOT NULL,
    ADD COLUMN `tempat` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `diskusi` MODIFY `tanggal_post` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `guru` ADD COLUMN `kode_pos` INTEGER NOT NULL,
    ADD COLUMN `pangkat_golongan` VARCHAR(20) NOT NULL,
    ADD COLUMN `status_pegawai` VARCHAR(100) NOT NULL,
    ADD COLUMN `tanggal_lahir` DATETIME NOT NULL,
    ADD COLUMN `tempat` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `log_aktivitas` MODIFY `waktu` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `mata_pelajaran` ADD COLUMN `id_admin` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `materi_pelajaran` MODIFY `tanggal_upload` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `notifikasi` MODIFY `waktu` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `pengumpulan_tugas` MODIFY `tanggal_kumpul` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `siswa` MODIFY `tanggal_lahir` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `tugas` MODIFY `deadline` DATETIME NOT NULL;

-- AddForeignKey
ALTER TABLE `mata_pelajaran` ADD CONSTRAINT `mata_pelajaran_id_admin_fkey` FOREIGN KEY (`id_admin`) REFERENCES `admin`(`id_admin`) ON DELETE CASCADE ON UPDATE CASCADE;
