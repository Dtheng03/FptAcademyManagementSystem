import { Checkbox, Divider, FormControl, FormControlLabel, FormHelperText, FormLabel, MenuItem, Radio, RadioGroup, Select } from '@mui/material';
import styles from './ProgramImportForm.module.scss';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// import UploadFileBtn from '../../components/Button/UploadFileBtn';
import { useState } from 'react';

const FormSelect = ({options, setOption}) => {    
    const handleChange = (e) => {
        setOption(e.target.value);
    }
    
    return<>
        <Select
            defaultValue={options[0]}
            onChange={handleChange}
            className={styles.formSelect}
        >
            {options.map(option => 
                <MenuItem key={option} value={option} className={styles.formSelectOption}>{option}</MenuItem>
            )}
        </Select>
    </> 
}

const encodingTypes = ["Auto-detect"];
const columnSeperators = ["Comma", "Dot"]

const ProgramImportForm = () => {
    const [uploadedFile, setUploadedFile] = useState("");
    const [encodingType, setEncodingType] = useState(encodingTypes[0]);
    const [columnSeperator, setColumnSeperator] = useState(columnSeperators[0]);

    return <div className={styles.container}>
        <div className={styles.header}>
            <p className={styles.headerText}>Import Training Programs</p>
            <button className={styles.closeBtn}>
                <HighlightOffIcon />
            </button>
        </div>
        <div className={styles.section}>
            <p className={styles.sectionTitle}>
                Import Setting
                <Divider sx={{marginTop: '7px'}}/>
            </p>
            <FormControl className={styles.formControl}>
                <FormLabel className={styles.formLabel}>File(csv)</FormLabel>
                <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                    {/* <UploadFileBtn 
                        content="Select" 
                        sx={{
                            width: 'fit-content',
                            height: '32px',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            padding: '2px 25px',
                            backgroundColor: '#2D3748',
                            cursor: 'pointer',
                            fontFamily: "Inter",
                            fontWeight: "bold",
                            fontSize: '14px',
                            lineHeight: '24px',
                            color: 'white'
                        }}
                        setUploadedFile={setUploadedFile}
                    /> */}
                    <FormHelperText sx={{fontStyle: 'italic'}}>
                        {uploadedFile.name}
                    </FormHelperText>
                </div>
            </FormControl>
            <FormControl className={styles.formControl}>
                <FormLabel className={styles.formLabel}>Encoding type</FormLabel>
                <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <div>
                        <FormSelect options={encodingTypes}/>  
                    </div>
                </div>
            </FormControl>
            <FormControl className={styles.formControl}>
                <FormLabel className={styles.formLabel}>Column separator</FormLabel>
                <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <FormSelect options={columnSeperators}/>  
                </div>
            </FormControl>
            <FormControl className={styles.formControl}>
                <FormLabel className={styles.formLabel}>Import template</FormLabel>
                <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'start'}}>
                    {/* <UploadFileBtn 
                        content="Download" 
                        sx={{
                            backgroundColor: 'transparent',
                            cursor: 'pointer',
                            fontFamily: "Inter",
                            fontWeight: "bold",
                            textDecoration: 'underline',
                            fontSize: '14px',
                            lineHeight: '24px',
                            color: '#2D3748'
                        }}
                    /> */}
                </div>
            </FormControl>
        </div>
        <div className={styles.section}>  
            <p className={styles.sectionTitle}>
                Duplicate Control
                <Divider sx={{marginTop: '7px'}}/>
            </p>
            <FormControl className={styles.formControl}>
                <FormLabel className={styles.formLabel}>Scanning</FormLabel>
                <div style={{width: '100%', display: 'flex', alignItems: 'center', gap: '16px'}}>
                    <FormControlLabel 
                        control={<Checkbox defaultChecked/>}
                        label="Program ID"
                    />
                    <FormControlLabel 
                        control={<Checkbox />}
                        label="Program name"
                    />
                </div>
            </FormControl>
            <FormControl className={styles.formControl}>
                <FormLabel className={styles.formLabel}>Duplicate handle</FormLabel>
                <RadioGroup sx={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px'}}>
                    <FormControlLabel 
                        control={<Radio defaultChecked/>}
                        label="Allow"
                    />
                    <FormControlLabel 
                        control={<Radio />}
                        label="Replace"
                    />
                    <FormControlLabel 
                        control={<Radio />}
                        label="Skip"
                    />
                </RadioGroup>
            </FormControl>
        </div>
    </div>;
}
 
export default ProgramImportForm;