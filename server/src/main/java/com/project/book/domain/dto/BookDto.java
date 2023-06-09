package com.project.book.domain.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import com.project.book.domain.dao.Genre;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class BookDto {
    private Long id;

    private String bookTitle;

    private String bookAuthor;

    private String bookCover;

    private String bookPages;

    private String bookPlot;

    private Date bookReleaseDate;

    private Integer bookSold;

    private Genre bookGenre;
}

