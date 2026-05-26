package com.example.pz_3

import java.time.LocalDate
import java.time.Period

fun calculateAge(day: Int, month: Int, year: Int): Int {
    val birthDate = LocalDate.of(year, month, day)
    val currentDate = LocalDate.now()

    return Period.between(birthDate, currentDate).years
}