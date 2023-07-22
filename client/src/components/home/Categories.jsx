import { Select, MenuItem, styled } from '@mui/material'
import { categories } from '../../constants/data';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const StyledSelect = styled(Select)`

  width: 200px;
  height: 40px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 8px 16px;
  margin-right: 150px;
  margin-left: 10px;
  &:focus {
    background-color: #fff;
  }
`;

const Categories = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');

  const navigate = useNavigate();

  const handleChange = (event) => {
    const selectedCategory = event.target.value;

    if (selectedCategory === "All Categories") {
      navigate("/")
    } else {
      navigate(`/?category=${selectedCategory}`);
    }
  }

  return (
    <StyledSelect
      value={category || 'All Categories'}
      onChange={handleChange}
    >
      <MenuItem value='All Categories'>All Categories</MenuItem>
      {categories.map((category) => (
        <MenuItem key={category.id} value={category.type}>
          {category.type}
        </MenuItem>
      ))}
    </StyledSelect>
  )
}

export default Categories;
