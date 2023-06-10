package com.project.book.domain.dao;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.project.book.domain.common.BaseDao;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "book")
public class Book extends BaseDao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "book_title", nullable = false)
    private String bookTitle;

    @Column(name = "book_author", nullable = false)
    private String bookAuthor;

    @Column(name = "book_cover", nullable = false, columnDefinition = "TEXT")
    private String bookCover;

    @Column(name = "book_pages", nullable = false)
    private String bookPages;

    @Column(name = "book_plot", nullable = false, columnDefinition = "TEXT")
    private String bookPlot;

    @Column(name = "book_release_date", nullable = false, columnDefinition = "DATE")
    private Date bookReleaseDate;

    @Column(name = "book_sold")
    private Integer bookSold;

    @ManyToOne
    private Genre bookGenre;
}
