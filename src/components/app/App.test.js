import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import fetchEncounters from '../patient-details/PatientDetailsService';
import fetchPatients from '../patients-page/PatientPageService';
import App from './App';

jest.mock('../patient-details/PatientDetailsService');
jest.mock('../patients-page/PatientPageService');
const patients = [{
  id: 1,
  firstName: 'Carlos',
  lastName: 'Santiago',
  ssn: '123-12-4563',
  email: 'carlos@gmail.com',
  street: '120 baltimore st.',
  city: 'Baltimore',
  state: 'MD',
  postal: '12345',
  age: 23,
  height: 75,
  weight: 280,
  insurance: 'none',
  gender: 'Male'
}];

const encounters = [{
  id: 1,
  patientId: 1,
  notes: '',
  visitCode: 'N3W 3C3',
  provider: 'New Hospital',
  billingCode: '123.456.789-00',
  icd10: 'Z99',
  totalCost: 120.0,
  copay: 1.0,
  chiefComplaint: 'Chest pain',
  pulse: 0,
  systolic: 0,
  diastolic: 0,
  date: '2021-00-04'
}];

test('renders app and naviagtes', () => {
  const history = createMemoryHistory();

  history.push('/dfsdf');

  fetchEncounters.mockImplementation((id, setEncounters) => {
    setEncounters(encounters);
  });
  fetchPatients.mockImplementation((setPatients) => {
    setPatients(patients);
  });

  render(
    <Router history={history}>
      <App />
    </Router>
  );

  fireEvent.click(screen.getByTestId('logo'));

  fireEvent.click(screen.getByTestId('createBtn'));

  fireEvent.click(screen.getByTestId('logo'));

  fireEvent.click(screen.getByTestId('personBtn'));

  fireEvent.click(screen.getByTestId('avatar'));

  fireEvent.click(screen.getByTestId('logo'));

  fireEvent.click(screen.getByTestId('personBtn'));

  fireEvent.click(screen.getByTestId('createBtn'));

  fireEvent.click(screen.getByTestId('logo'));

  fireEvent.click(screen.getByTestId('personBtn'));

  fireEvent.click(screen.getByTestId('viewBtn'));

  fireEvent.click(screen.getByTestId('closeBtn'));

  fireEvent.click(screen.getByTestId('editBtn'));
});
