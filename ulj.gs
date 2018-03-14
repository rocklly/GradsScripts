function main(args)

*******************************************************************
**************** Parsing van de argumenten: dag, uur **************
  date = subwrd(args,1)
  hour  = subwrd(args,2)

*******************************************************************
******************* Opening of datafile: opendap ******************

'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25/gfs'date'/gfs_0p25_'hour'z'
*'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25_1hr/gfs'date'/gfs_0p25_1hr_'hour'z'

*******************************************************************
********************** Mapopties en resolutie**********************
'set mproj lambert'

*'set lon -32 30'
*'set lat 30 65'
*'set mpvals -2 19 47 59'

'set lon -60 55'
'set lat 25 80'
'set mpvals -10 35 45 70'

'set display color white'
'set csmooth on'
'set mpdset hires'
'set strsiz 0.2'
'set xlab off'
'set ylab off'
'set parea 0.00 11.0 0.00 8.0'
'set grads off'
'set grid off'

*******************************************************************
********************** Info uit het descriptorfile ****************
'q ctlinfo'
_ctl = result
_undef = getctl(undef)
_tdef = getctl(tdef)
_zdef = getctl(zdef)

*******************************************************************
********************** Tijdsinformatie ****************************
tsize = subwrd(_tdef,2)
_t1 = 1       ;
_t2 = 45
tsize = _t2 - _t1 + 1
'set t '_t1' '_t2
'q dims'
times  = sublin(result,5)
_time1 = subwrd(times,6)  
_time2 = subwrd(times,8)
_tdim = _time1' '_time2
tincr = subwrd(_tdef,5)
_tdef = 'tdef 'tsize' linear '_time1' 'tincr
runvar = subwrd(_tdef,4)

'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

************************************************
* 500mb Isotachs                               *
************************************************

* iteratie
**********
maps = 82

  i = 1
  while ( i<maps )
'set t ' i

* Colortable
************
'color.gs 0 200 2 -gxout shaded -kind (255,255,255)->(217,217,217)->(178,178,178)->(139,139,139)->(100,100,100)->(100,100,255)->(110,94,239)->(120,88,222)->(130,81,205)->(141,75,188)->(151,68,171)->(161,62,154)->(171,56,137)->(182,49,120)->(192,43,104)->(202,36,87)->(212,30,70)->(223,23,53)->(233,17,36)->(243,11,19)->(253,4,2)'

*******************************************************************
********************** Titels & opmaak ****************************
'set strsiz 0.18'
'set string 1 r 12 0' ; 'draw string 10.95 8.3 300-250mb Isotachs, Streamlines, Geopotential height (m) & MSLP'

say '.Calculations'
* Declaration variables & calculations
**************************************
'define u250 = ugrdprs(lev=250)*1.943844'
'define v250 = vgrdprs(lev=250)*1.943844'
'define u300 = ugrdprs(lev=300)*1.943844'
'define v300 = vgrdprs(lev=300)*1.943844'

'define uavg = (u250 + u300)/2'
'define vavg = (v250 + v300)/2'

'define wspeed = sqrt(uavg*uavg+vavg*vavg)'

'define slp  = const((prmslmsl*0.01),0,-u)'

say '.Visualisations'
* visualisatie 500mb windspeeds
*******************************
say '..500mb Isotachs'
'd wspeed'

'set rgb 250 0 0 0 20'
'set gxout stream'
'set ccolor 250'
'set strmden 5'
'd uavg;vavg'

say '..MSLP per 1mb'
* visualisatie MSLP
*******************
'set rgb 250 0 0 0 80'
'set gxout contour'
'set ccolor 250'
'set cstyle 3'
'set cint 1'
'set clopts -1'
'set clab off'
'd slp'

say '..MSLP per 4mb'
* visualisatie MSLP
*******************
'set rgb 250 0 0 0 150'
'set gxout contour'
'set ccolor 250'
'set cstyle 1'
'set cint 4'
'set clopts -1'
'set clab masked'
'set cthick 6'
'd slp'

say '..Isotachs per 25kts'
* visualisatie Isotachs
*******************
'set rgb 250 255 255 255 255'
'set gxout contour'
'set ccolor 250'
'set cstyle 3'
'set clopts -1'
'set clab off'
'set cthick 1'
'set cmin 50'
'set cint 25'
'd wspeed'

say '..500mb GPM'
* visualisatie 500mb height contours
************************************
'set gxout contour'
'set rgb 250 255 255 255 255'
'set cthick 13'
'set ccolor 250'
'set cstyle 1'
'set cint 50'
'set clopts -1'
'set clab masked'
'set cthick 7'
'd smth9(hgtprs(lev=500))'

say '.Colorbar & annotations'
* colorbar & annotations
************************
'q dims'
times  = sublin(result,5)
validvar = subwrd(times,6)

'xcbar 0.28 0.53 0.35 7.55 -direction v  -line on -fskip 5 -fwidth 0.10 -fheight 0.11'

'set strsiz 0.12'
'set string 1 r 3 270' ; 'draw string 0.15 0.35 <----- kts, Higher means increasing upper level windspeed ----->' 

'set strsiz 0.10'
'set string 1 r 4 0' ; 'draw string 10.95 7.85 MSLP: Dashed contours each 1mb, Thick contours each 4mb'
'set string 1 r 4 0' ; 'draw string 10.95 7.65 500mb geopotential height: Thick contours each 50 meter'
'set string 1 r 4 0' ; 'draw string 10.95 7.45 300-250mb Isotachs: Dashed contour each 25 kts'

'set strsiz 0.14'
'set string 1 r 7 0' ; 'draw string 10.95 0.2 Data: NOAA GFS model (0.25DEG)'

'set strsiz 0.10'
'set string 4 r 4 0' ; 'draw string 10.95 8.1 http://www.chase2.be - http://www.facebook.com/chase2be - Run: 'runvar' - `4Valid: 'validvar

say '.Saving file'

* opslag
********
'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.1.a2.oga.1\i686\ulj'i'_valid_'validvar'_run_'runvar'.png x1024 y768'

'clear'
'set grads off'

* iteratie progressie
*********************
i = i+1
endwhile
'set grads off'


************************************************************* 
* END OF MAIN SCRIPT                                        *
************************************************************* 

function getctl(handle)
line = 1
found = 0
while (!found)
  info = sublin(_ctl,line)
  if (subwrd(info,1)=handle)
    _handle = info
    found = 1
  endif
  line = line + 1
endwhile
return _handle
