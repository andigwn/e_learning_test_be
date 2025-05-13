-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_name` VARCHAR(30) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id_users` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `token` VARCHAR(500) NULL,
    `id_role` INTEGER NOT NULL,

    PRIMARY KEY (`id_users`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin` (
    `id_admin` INTEGER NOT NULL AUTO_INCREMENT,
    `id_users` INTEGER NOT NULL,
    `nip` INTEGER NOT NULL,
    `nama` VARCHAR(100) NOT NULL,
    `no_hp` VARCHAR(15) NOT NULL,
    `alamat` VARCHAR(500) NOT NULL,
    `jenis_kelamin` ENUM('laki-laki', 'perempuan') NOT NULL,
    `image` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id_admin`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guru` (
    `id_guru` INTEGER NOT NULL AUTO_INCREMENT,
    `id_users` INTEGER NOT NULL,
    `nip` INTEGER NOT NULL,
    `nama` VARCHAR(100) NOT NULL,
    `no_hp` VARCHAR(15) NOT NULL,
    `alamat` VARCHAR(500) NOT NULL,
    `jenis_kelamin` ENUM('laki-laki', 'perempuan') NOT NULL,
    `image` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id_guru`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jurusan` (
    `kode_jurusan` VARCHAR(25) NOT NULL,
    `nama_jurusan` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`kode_jurusan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `siswa` (
    `id_siswa` INTEGER NOT NULL AUTO_INCREMENT,
    `id_users` INTEGER NOT NULL,
    `nama_jurusan` VARCHAR(25) NOT NULL,
    `nis` INTEGER NOT NULL,
    `nama_siswa` VARCHAR(100) NOT NULL,
    `no_hp` VARCHAR(15) NOT NULL,
    `alamat` VARCHAR(500) NOT NULL,
    `jenis_kelamin` ENUM('laki-laki', 'perempuan') NOT NULL,
    `image` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id_siswa`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mata_pelajaran` (
    `id_mapel` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_mapel` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id_mapel`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ruangan` (
    `id_ruangan` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_ruangan` VARCHAR(20) NOT NULL,

    PRIMARY KEY (`id_ruangan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kelas` (
    `kode_kelas` VARCHAR(11) NOT NULL,
    `nama_kelas` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`kode_kelas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jadwal` (
    `id_jadwal` INTEGER NOT NULL AUTO_INCREMENT,
    `id_mapel` INTEGER NOT NULL,
    `id_guru` INTEGER NOT NULL,
    `kode_kelas` VARCHAR(11) NOT NULL,
    `id_ruangan` INTEGER NOT NULL,
    `hari` ENUM('Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu') NOT NULL,
    `tipe` ENUM('mengajar', 'pelajaran') NOT NULL,
    `jam_mulai` TIME NOT NULL,
    `jam_selesai` TIME NOT NULL,
    `semester` ENUM('Ganjil', 'Genap') NOT NULL,
    `tahun_ajaran` VARCHAR(9) NOT NULL,
    `status` ENUM('aktif', 'nonaktif') NOT NULL,

    PRIMARY KEY (`id_jadwal`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `absensi` (
    `id_absensi` INTEGER NOT NULL AUTO_INCREMENT,
    `id_siswa` INTEGER NOT NULL,
    `id_jadwal` INTEGER NOT NULL,
    `tanggal` DATE NOT NULL,
    `status_kehadiran` ENUM('hadir', 'izin', 'sakit', 'alfa') NOT NULL,
    `catatan` TEXT NULL,

    PRIMARY KEY (`id_absensi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `diskusi` (
    `id_diskusi` INTEGER NOT NULL AUTO_INCREMENT,
    `kode_kelas` VARCHAR(11) NOT NULL,
    `pengirim` INTEGER NOT NULL,
    `judul` VARCHAR(100) NOT NULL,
    `konten` TEXT NOT NULL,
    `tanggal_post` DATETIME NOT NULL,

    PRIMARY KEY (`id_diskusi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `log_aktivitas` (
    `id_log` INTEGER NOT NULL AUTO_INCREMENT,
    `id_users` INTEGER NOT NULL,
    `aksi` VARCHAR(50) NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `waktu` DATETIME NOT NULL,

    PRIMARY KEY (`id_log`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `materi_pelajaran` (
    `id_materi` INTEGER NOT NULL AUTO_INCREMENT,
    `id_mapel` INTEGER NOT NULL,
    `id_guru` INTEGER NOT NULL,
    `judul` VARCHAR(100) NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `jenis` ENUM('file', 'video', 'link') NOT NULL,
    `path_file` VARCHAR(255) NOT NULL,
    `tanggal_upload` DATETIME NOT NULL,

    PRIMARY KEY (`id_materi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nilai` (
    `id_nilai` INTEGER NOT NULL AUTO_INCREMENT,
    `id_siswa` INTEGER NOT NULL,
    `id_mapel` INTEGER NOT NULL,
    `jenis_nilai` ENUM('tugas', 'UTS', 'UAS', 'praktik') NOT NULL,
    `nilai` INTEGER NOT NULL,
    `semester` ENUM('Ganjil', 'Genap') NOT NULL,
    `tahun_ajaran` VARCHAR(9) NOT NULL,

    PRIMARY KEY (`id_nilai`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notifikasi` (
    `id_notifikasi` INTEGER NOT NULL AUTO_INCREMENT,
    `id_users` INTEGER NOT NULL,
    `pesan` TEXT NOT NULL,
    `dibaca` BOOLEAN NULL,
    `link` VARCHAR(255) NOT NULL,
    `waktu` DATETIME NOT NULL,

    PRIMARY KEY (`id_notifikasi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tugas` (
    `id_tugas` INTEGER NOT NULL AUTO_INCREMENT,
    `id_mapel` INTEGER NOT NULL,
    `id_guru` INTEGER NOT NULL,
    `kode_kelas` VARCHAR(11) NOT NULL,
    `judul` VARCHAR(100) NOT NULL,
    `deskripsi` TEXT NOT NULL,
    `deadline` DATETIME NOT NULL,
    `file_tugas` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id_tugas`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pengumpulan_tugas` (
    `id_pengumpulan` INTEGER NOT NULL AUTO_INCREMENT,
    `id_tugas` INTEGER NOT NULL,
    `id_siswa` INTEGER NOT NULL,
    `file_jawaban` VARCHAR(255) NOT NULL,
    `nilai` INTEGER NOT NULL,
    `tanggal_kumpul` DATETIME NOT NULL,

    PRIMARY KEY (`id_pengumpulan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_id_role_fkey` FOREIGN KEY (`id_role`) REFERENCES `role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `admin` ADD CONSTRAINT `admin_id_users_fkey` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `guru` ADD CONSTRAINT `guru_id_users_fkey` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `siswa` ADD CONSTRAINT `siswa_id_users_fkey` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `siswa` ADD CONSTRAINT `siswa_nama_jurusan_fkey` FOREIGN KEY (`nama_jurusan`) REFERENCES `jurusan`(`kode_jurusan`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jadwal` ADD CONSTRAINT `jadwal_id_mapel_fkey` FOREIGN KEY (`id_mapel`) REFERENCES `mata_pelajaran`(`id_mapel`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jadwal` ADD CONSTRAINT `jadwal_id_guru_fkey` FOREIGN KEY (`id_guru`) REFERENCES `guru`(`id_guru`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jadwal` ADD CONSTRAINT `jadwal_kode_kelas_fkey` FOREIGN KEY (`kode_kelas`) REFERENCES `kelas`(`kode_kelas`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jadwal` ADD CONSTRAINT `jadwal_id_ruangan_fkey` FOREIGN KEY (`id_ruangan`) REFERENCES `ruangan`(`id_ruangan`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `absensi` ADD CONSTRAINT `absensi_id_siswa_fkey` FOREIGN KEY (`id_siswa`) REFERENCES `siswa`(`id_siswa`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `absensi` ADD CONSTRAINT `absensi_id_jadwal_fkey` FOREIGN KEY (`id_jadwal`) REFERENCES `jadwal`(`id_jadwal`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diskusi` ADD CONSTRAINT `diskusi_kode_kelas_fkey` FOREIGN KEY (`kode_kelas`) REFERENCES `kelas`(`kode_kelas`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `diskusi` ADD CONSTRAINT `diskusi_pengirim_fkey` FOREIGN KEY (`pengirim`) REFERENCES `users`(`id_users`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `log_aktivitas` ADD CONSTRAINT `log_aktivitas_id_users_fkey` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `materi_pelajaran` ADD CONSTRAINT `materi_pelajaran_id_mapel_fkey` FOREIGN KEY (`id_mapel`) REFERENCES `mata_pelajaran`(`id_mapel`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `materi_pelajaran` ADD CONSTRAINT `materi_pelajaran_id_guru_fkey` FOREIGN KEY (`id_guru`) REFERENCES `guru`(`id_guru`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nilai` ADD CONSTRAINT `nilai_id_siswa_fkey` FOREIGN KEY (`id_siswa`) REFERENCES `siswa`(`id_siswa`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nilai` ADD CONSTRAINT `nilai_id_mapel_fkey` FOREIGN KEY (`id_mapel`) REFERENCES `mata_pelajaran`(`id_mapel`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `notifikasi` ADD CONSTRAINT `notifikasi_id_users_fkey` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tugas` ADD CONSTRAINT `tugas_id_mapel_fkey` FOREIGN KEY (`id_mapel`) REFERENCES `mata_pelajaran`(`id_mapel`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tugas` ADD CONSTRAINT `tugas_id_guru_fkey` FOREIGN KEY (`id_guru`) REFERENCES `guru`(`id_guru`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tugas` ADD CONSTRAINT `tugas_kode_kelas_fkey` FOREIGN KEY (`kode_kelas`) REFERENCES `kelas`(`kode_kelas`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengumpulan_tugas` ADD CONSTRAINT `pengumpulan_tugas_id_tugas_fkey` FOREIGN KEY (`id_tugas`) REFERENCES `tugas`(`id_tugas`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pengumpulan_tugas` ADD CONSTRAINT `pengumpulan_tugas_id_siswa_fkey` FOREIGN KEY (`id_siswa`) REFERENCES `siswa`(`id_siswa`) ON DELETE CASCADE ON UPDATE CASCADE;
