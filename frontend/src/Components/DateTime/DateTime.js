import React from 'react';

export default function DateTime({ date, options = {} }) {
  const { weekday, year, month, day, hour, minute, second } = options;

  var currentLocale = new Intl.DateTimeFormat().resolvedOptions().locale;

  const getDate = () =>
    new Intl.DateTimeFormat(currentLocale, {
      weekday: weekday || 'short',
      year: year || 'numeric',
      month: month || 'long',
      day: day || 'numeric',
      hour: hour || 'numeric',
      minute: minute || 'numeric',
      second: second || 'numeric',
    }).format(Date.parse(date));

  return (
    <>
      {getDate()}
    </>
  );
}