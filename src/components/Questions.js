import { useMemo } from 'react';
import { TextInput } from 'flowbite-react';
import React from 'react';
import { HiSearch } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { selectQuestions } from '../store/data/data.selectors';
import { selectQuestionsFilters } from '../store/menu/menu.selectors';
import { setQuestions } from '../store/menu/menu.actions';
import { usePagination } from '../hooks/usePagination';
import { useFilters } from '../hooks/useFilters';
import Pagination from './Pagination';

const Question = ({ question }) => {
  return (
    <div className='flex w-full items-center'>
      <p className='mr-2 mb-2'>{question}</p>
    </div>
  );
};

export default function Questions() {
  const dispatch = useDispatch();
  const questions = useSelector(selectQuestions);
  const questionsFilters = useSelector(selectQuestionsFilters);
  const { search } = questionsFilters;

  const handleChangeSearch = (event) => {
    const { value } = event.target;
    dispatch(setQuestions({ ...questionsFilters, search: value }));
  };

  const filteredQuestions = useFilters(questions, questionsFilters);

  const { page, total, pageUp, pageDown, slice } = usePagination(
    filteredQuestions,
    10
  );

  const questionsSlice = useMemo(() => {
    return (
      <div className='mb-2 max-h-full overflow-auto'>
        {slice.length > 0 &&
          slice.map((question) => (
            <Question key={question} question={question} />
          ))}
      </div>
    );
  }, [slice]);

  return (
    <div className='flex flex-col h-full'>
      <div className='flex mb-3'>
        <b>Constraints</b>
      </div>
      <TextInput
        className='mb-2'
        type='search'
        icon={HiSearch}
        placeholder='Quick search for constraint'
        value={search}
        onChange={handleChangeSearch}
      />
      {questionsSlice}
      <Pagination
        page={page}
        total={total}
        pageUp={pageUp}
        pageDown={pageDown}
      />
    </div>
  );
}
