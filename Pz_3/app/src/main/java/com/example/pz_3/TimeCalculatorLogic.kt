package com.example.pz_3

import java.time.LocalDateTime
import java.time.ZoneOffset
import kotlin.math.abs

fun calculateSeconds(day: Int, month: Int, year: Int): Long {

    val ancientDate = LocalDateTime.of(-365, 5, 2, 11, 30)

    val userDate = LocalDateTime.of(year, month, day, 12, 0)

    val ancientSeconds = ancientDate.toEpochSecond(ZoneOffset.UTC)
    val userSeconds = userDate.toEpochSecond(ZoneOffset.UTC)

    return abs(userSeconds - ancientSeconds)
}