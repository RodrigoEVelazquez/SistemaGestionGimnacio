using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using SistemaGym.API.Models;

namespace SistemaGym.API.Data;

public partial class GimnasioContext : DbContext
{
    public GimnasioContext()
    {
    }

    public GimnasioContext(DbContextOptions<GimnasioContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Actividad> Actividads { get; set; }

    public virtual DbSet<Horario> Horarios { get; set; }

    public virtual DbSet<Inscripcion> Inscripcions { get; set; }

    public virtual DbSet<Pase> Pases { get; set; }

    public virtual DbSet<Socio> Socios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=localhost;Database=BdGimnasio;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Actividad>(entity =>
        {
            entity.HasKey(e => e.IdActividad);

            entity.ToTable("actividad");

            entity.Property(e => e.IdActividad).HasColumnName("id_actividad");
            entity.Property(e => e.Descripcion)
                .HasMaxLength(50)
                .HasColumnName("descripcion");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .HasColumnName("nombre");

            entity.HasMany(d => d.IdHorarios).WithMany(p => p.IdActividads)
                .UsingEntity<Dictionary<string, object>>(
                    "Actividadxhorario",
                    r => r.HasOne<Horario>().WithMany()
                        .HasForeignKey("IdHorario")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK_ActHor_Horario"),
                    l => l.HasOne<Actividad>().WithMany()
                        .HasForeignKey("IdActividad")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK_ActHor_Actividad"),
                    j =>
                    {
                        j.HasKey("IdActividad", "IdHorario").HasName("PK__activida__508B7E5501A156E5");
                        j.ToTable("actividadxhorario");
                        j.IndexerProperty<int>("IdActividad").HasColumnName("id_actividad");
                        j.IndexerProperty<int>("IdHorario").HasColumnName("id_horario");
                    });

            entity.HasMany(d => d.IdSocios).WithMany(p => p.IdActividads)
                .UsingEntity<Dictionary<string, object>>(
                    "Actividadxsocio",
                    r => r.HasOne<Socio>().WithMany()
                        .HasForeignKey("IdSocio")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK_actividadxsocio_socio"),
                    l => l.HasOne<Actividad>().WithMany()
                        .HasForeignKey("IdActividad")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK_actividadxsocio_actividad"),
                    j =>
                    {
                        j.HasKey("IdActividad", "IdSocio");
                        j.ToTable("actividadxsocio");
                        j.IndexerProperty<int>("IdActividad").HasColumnName("id_actividad");
                        j.IndexerProperty<int>("IdSocio").HasColumnName("id_socio");
                    });
        });

        modelBuilder.Entity<Horario>(entity =>
        {
            entity.HasKey(e => e.IdHorario);

            entity.ToTable("horario");

            entity.Property(e => e.IdHorario).HasColumnName("id_horario");
            entity.Property(e => e.Desde).HasColumnName("desde");
            entity.Property(e => e.Dia)
                .HasMaxLength(50)
                .HasColumnName("dia");
            entity.Property(e => e.Hasta).HasColumnName("hasta");
        });

        modelBuilder.Entity<Inscripcion>(entity =>
        {
            entity.HasKey(e => e.IdInscripcion);

            entity.ToTable("inscripcion");

            entity.Property(e => e.IdInscripcion).HasColumnName("id_inscripcion");
            entity.Property(e => e.Estado)
                .HasMaxLength(50)
                .HasColumnName("estado");
            entity.Property(e => e.FechaInicio).HasColumnName("fecha_inicio");
            entity.Property(e => e.FechaVencimiento).HasColumnName("fecha_vencimiento");
            entity.Property(e => e.IdPase).HasColumnName("id_pase");
            entity.Property(e => e.IdSocio).HasColumnName("id_socio");

            entity.HasOne(d => d.IdPaseNavigation).WithMany(p => p.Inscripcions)
                .HasForeignKey(d => d.IdPase)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_inscripcion_Pase");

            entity.HasOne(d => d.IdSocioNavigation).WithMany(p => p.Inscripcions)
                .HasForeignKey(d => d.IdSocio)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_inscripcion_socio");
        });

        modelBuilder.Entity<Pase>(entity =>
        {
            entity.HasKey(e => e.IdPase).HasName("PK__pase__094112EDDF803E3F");

            entity.ToTable("pase");

            entity.Property(e => e.IdPase).HasColumnName("id_pase");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nombre");
            entity.Property(e => e.Precio)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("precio");
        });

        modelBuilder.Entity<Socio>(entity =>
        {
            entity.HasKey(e => e.IdSocio);

            entity.ToTable("socio");

            entity.Property(e => e.IdSocio).HasColumnName("id_socio");
            entity.Property(e => e.Altura)
                .HasMaxLength(50)
                .HasColumnName("altura");
            entity.Property(e => e.Apellido)
                .HasMaxLength(50)
                .HasColumnName("apellido");
            entity.Property(e => e.Barrio)
                .HasMaxLength(50)
                .HasColumnName("barrio");
            entity.Property(e => e.Calle)
                .HasMaxLength(50)
                .HasColumnName("calle");
            entity.Property(e => e.Dni).HasColumnName("dni");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .HasColumnName("email");
            entity.Property(e => e.FechaNacimiento)
                .HasMaxLength(50)
                .HasColumnName("fecha_nacimiento");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .HasColumnName("nombre");
            entity.Property(e => e.Telefono)
                .HasMaxLength(50)
                .HasColumnName("telefono");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
