function main(args)

*******************************************************************
**************** Parsing van de argumenten: dag, uur **************
  date = subwrd(args,1)
  hour  = subwrd(args,2)

*******************************************************************
******************* Opening of datafile: opendap ******************

'sdfopen http://nomads.ncep.noaa.gov:9090/dods/gfs_0p25/gfs'date'/gfs_0p25_'hour'z'
*'sdfopen http://monsoondata.org:9090/dods/gfs2/gfs.'date''hour'b'

*******************************************************************
********************** Mapopties en resolutie**********************
'set mproj lambert'
*'set lon -10 55'
*'set lat 55 75'
'set lon -32 30'
'set lat 30 65'
'set mpvals -2 19 47 59'
'set display color white'
'set csmooth on'
*'set lat 42 56'
*'set lon -5 15'
'set mpdset hires'
'set strsiz 0.2'
'set xlab off'
'set ylab off'
'set parea 0.04 9.7 0.8 8.0'

*******************************************************************
********************** Info uit het descriptorfile ****************
'q ctlinfo'
_ctl = result
_undef = getctl(undef)
_tdef = getctl(tdef)
_zdef = getctl(zdef)

maps = 81

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
huh = subwrd(_tdef,4)

*******************************************************************
*******************************************************************
**              Fastowarn severe weather library                 **
**                        Grads script                           **
*******************************************************************
*******************************************************************



*******************************************************************
* 850mb temperature advection                                     *
*******************************************************************

"run constants.gs"

* kleurentabel
**************
'set rgb 101 255 0 250'
'set rgb 102 234 3 250'
'set rgb 103 213 7 250'
'set rgb 104 192 10 250'
'set rgb 105 171 14 250'
'set rgb 106 150 17 250'
'set rgb 107 129 21 250'
'set rgb 108 108 24 250'
'set rgb 109 87 28 250'
'set rgb 110 66 31 250'
'set rgb 111 45 35 250'
'set rgb 112 0 39 235'
'set rgb 113 0 50 219'
'set rgb 114 0 62 204'
'set rgb 115 0 73 188'
'set rgb 116 0 84 172'
'set rgb 117 0 96 157'
'set rgb 118 0 107 141'
'set rgb 119 0 119 125'
'set rgb 120 0 130 110'
'set rgb 121 0 141 94'
'set rgb 122 0 153 79'
'set rgb 123 0 164 63'
'set rgb 124 0 175 47'
'set rgb 125 0 187 32'
'set rgb 126 0 198 16'
'set rgb 127 51 209 63'
'set rgb 128 102 220 111'
'set rgb 129 153 232 159'
'set rgb 130 204 243 207'
'set rgb 131 255 247 255'
'set rgb 132 250 250 180'
'set rgb 133 250 250 143'
'set rgb 134 255 250 123'
'set rgb 135 255 255 74'
'set rgb 136 255 255 37'
'set rgb 137 255 241 36'
'set rgb 138 255 227 34'
'set rgb 139 255 213 32'
'set rgb 140 255 199 30'
'set rgb 141 255 185 28'
'set rgb 142 254 171 26'
'set rgb 143 254 157 24'
'set rgb 144 254 143 22'
'set rgb 145 254 129 20'
'set rgb 146 254 115 18'
'set rgb 147 253 101 16'
'set rgb 148 253 87 14'
'set rgb 149 253 73 12'
'set rgb 150 253 59 10'
'set rgb 151 253 45 8'
'set rgb 152 245 15 3'
'set rgb 153 236 14 3'
'set rgb 154 226 12 3'
'set rgb 155 217 11 2'
'set rgb 156 207 9 2'
'set rgb 157 198 8 2'
'set rgb 158 188 6 2'
'set rgb 159 179 5 1'
'set rgb 160 169 3 1'
'set rgb 161 160 2 1'


* Iteratie
**********
  i = 1
  while ( i<maps )
'set t 'i


* Define abbreviation
*
"define tcos = cos(lat*d2r)"
*
* Calculate for all levels, change if necessary
*
"set lev 1000"
"define dty = cdiff(tmpprs,y)"
"define dtx = cdiff(tmpprs,x)"
"define dy = cdiff(lat,y)*d2r*rearth"
"define dx = cdiff(lon,x)*d2r*rearth*tcos"
"define tadv = (-1*ugrdprs*(dtx/dx)-1*vgrdprs*(dty/dy))*3600"

'set gxout shaded'
'set csmooth on'
"set clevs -3.0, -2.9, -2.8, -2.7, -2.6, -2.5, -2.4, -2.3, -2.2, -2.1, -2.0, -1.9, -1.8, -1.7, -1.6, -1.5, -1.4, -1.3, -1.2, -1.1, -1.0, -0.9, -0.8, -0.7, -0.6, -0.5, -0.4, -0.3, -0.2, -0.1, 0.0,  0.1,  0.2,  0.3,  0.4,  0.5,  0.6,  0.7,  0.8,  0.9,  1.0,  1.1,  1.2,  1.3,  1.4,  1.5,  1.6,  1.7,  1.8,  1.9,  2.0,  2.1,  2.2,  2.3,  2.4,  2.5,  2.6,  2.7,  2.8,  2.9"
"set ccols 101 102 103 104 105 106 107 108 109 110 111 112 113 114 115 116 117 118 119 120 121 122 123 124 125 126 127 128 129 130 131 132 133 134 135 136 137 138 139 140 141 142 143 144 145 146 147 148 149 150 151 152 153 154 155 156 157 158 159 160 161"
'd tadv'
'run cbarm'

* visualisatie 500mb height contours
************************************
'set gxout contour'
'set ccolor 1'
'set cint 40'
'set clopts -1'
'set clab masked'
'd hgtprs(lev=500)'

* labels & opmaak
*****************
'q dims'
times  = sublin(result,5)
hub = subwrd(times,6)

'set strsiz 0.13'
'set string 1 l 4 0' ; 'draw string 0.15 0.4 Stormplatform'
'set strsiz 0.12'
'set string 1 r 3 90' ; 'draw string 9.9 4.6 Celsius per hour'
'set string 1 r 6 0' ; 'draw string 9.45 0.6 Valid: 'hub
'set string 1 l 6 0' ; 'draw string 0.15 0.6 Data: NOAA GFS model, run: 'huh
'set strsiz 0.18'
'set string 1 l 12 0' ; 'draw string 0.15 8.3 1000mb Temperature-advection (Celsius per hour)'

'printim C:\OpenGrADS\Contents\Cygwin\Versions\2.0.2.oga.2\i686\tadvection'i'.png x1024 y768'

* iteratie progressie
*********************

'clear'
'set grads off'
i = i+1
endwhile



* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* END OF MAIN SCRIPT                                        *
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 

function setmap(args)
*'set mproj lambert'
*'set mpvals 15 52 54 71'
'set lon -20 40'
'set lat 40 60'
'set mpdset hires'

'set display color white'
'set background 98'
'c'
'set grads off'

*'set parea 0.02 9.54 0.8 8.50'
'set parea off'
'set rgb 99 1 1 1'
*'draw rec 0.02 0.02 9.54 0.81'
*'draw rec 9.54 0.02 10.99 8.48'

return

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
function vrng(f1,f2)
'set gxout stat'
'd 'f1
data = sublin(result,8)
ymx = subwrd(data,5)
ymn = subwrd(data,4)
'd 'f2
data = sublin(result,8)
zmx = subwrd(data,5)
zmn = subwrd(data,4)
if (zmx > ymx) ; ymx = zmx ; endif
if (zmn < ymn) ; ymn = zmn ; endif
dy = ymx-ymn
ymx = ymx + 0.08 * dy
ymn = ymn - 0.08 * dy
if ((ymx-ymn)/2.2 < 1)
  incr = (ymx-ymn)/4
  incr = 0.01 * (math_nint(100*incr))
else
  incr = math_nint((ymx-ymn)/4)
endif
'set vrange 'ymn' 'ymx
'set ylint 'incr
if (ymn=0 & ymx=0 & incr=0)
  'set vrange -.9 .9'
  'set ylint 1'
endif
'set gxout line'
return

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
function rh2vrng(f1)
'set gxout stat'
'd 'f1
data = sublin(result,8)
ymn = subwrd(data,4)
ymx = subwrd(data,5)
if (ymn < 20) 
  miny = 0 
  'set ylevs 20 40 60 80'
endif
if (ymn >= 20 & ymn < 30) 
  miny = 20 
  'set ylevs 30 50 70 90'
endif
if (ymn >= 30 & ymn < 40) 
  miny = 30 
  'set ylevs 40 50 60 70 80 90'
endif
if (ymn >= 40 & ymn < 50) 
  miny = 40 
  'set ylevs 50 60 70 80 90'
endif
if (ymn >= 50 & ymn < 60) 
  miny = 50
  'set ylevs 60 70 80 90'
endif
if (ymn >= 60) 
  miny = 60
  'set ylevs 70 80 90'
endif
'set vrange 'miny' 'ymx+3
return

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
function isen(field,tgrid,pgrid,tlev)
*----------------------------------------------------------------------
* Bob Hart (hart@ems.psu.edu) /  PSU Meteorology
* 2/26/1999
*
* 2/26/99 - Fixed a bug that caused the script to crash on
*           certain machines.  
*
* GrADS function to interpolate within a 3-D grid to a specified
* isentropic level.  Can also be used on non-pressure level data, such
* as sigma or eta-coordinate output where pressure is a function
* of time and grid level.  Can be used to create isentropic PV surfaces
* (examples are given at end of documentation just prior to
* function.)
* 
* Advantages:  Easy to use, no UDFs.  Disadvantages:  Can take 5-20 secs.
*
* Arguments:
*    field = name of 3-D grid to interpolate
*
*    tgrid = name of 3-D grid holding temperature values (deg K) at each
*            gridpoint.
*
*    pgrid = name of 3-D grid holding pressure values (mb) at each gridpoint
*            If you are using regular pressure-level data, this should be
*            set to the builtin GrADS variable 'lev'.
*
*    tlev  = theta-level (deg K) at which to interpolate
*
* Function returns:  defined grid interp holding interpolated values
*
* NOTE:  YOU NEED TO INCLUDE A COPY OF THIS FUNCTION IN YOUR SCRIPT
*
* NOTE:  Areas having tlev below bottom level or above upper level 
*        will be undefined in output field. Extrapolation is NOT
*        performed!!
*
*------------------------------------------------------------------------
*
* EXAMPLE FUNCTION CALLS:
*
* Sample variables: u = u-wind in m/s
*                   v = v-wind in m/s
*                   w = vertical velocity
*                   t = temperature in K
*                  PP = pressure data in mb
*
* 1) Display vertical velocity field on 320K surface:
* 
*    'd 'isen(w,t,PP,320)
*
* 2) Create & Display colorized streamlines on 320K surface:
*
*    'define u320='isen(ugrdprs,tmpprs,lev,320)
*    'define v320='isen(vgrdprs,tmpprs,lev,320)
*    'set z 1'
*    'set gxout stream'
*    'd u320;v320;mag(u320,v320)'
*
* 3) Create & display a 320K isentropic PV surface:
*
*    'set lev 1050 150'
*    'define coriol=2*7.29e-5*sin(lat*3.1415/180)'
*    'define dudy=cdiff(u,y)/(111177*cdiff(lat,y))'
*    'define dvdx=cdiff(v,x)/(111177*cdiff(lon,x)*cos(lat*3.1415/180))'
*    'define dt=t(z-1)*pow(1000/PP(z-1),0.286)-t(z+1)*pow(1000/PP(z+1),0.286)'
*    'define dp=100*(PP(z-1)-PP(z+1))'
*    'define dtdp=dt/dp'
*    'define part1='isen(dvdx,t,PP,320)
*    'define part2='isen(dudy,t,PP,320)
*    'define part3='isen(dtdp,t,PP,320)
*    'define pv320=-9.8*(coriol+part1-part2)*part3'
*    'set z 1'
*    'd pv320'
*
* PROBLEMS:  Send email to Bob Hart (hart@ems.psu.edu)
* 
*-----------------------------------------------------------------------
*-------------------- BEGINNING OF FUNCTION ----------------------------
*-----------------------------------------------------------------------

* Get initial dimensions of dataset so that exit dimensions will be
* same

'q dims'
rec=sublin(result,4)
ztype=subwrd(rec,3)
if (ztype = 'fixed') 
   zmin=subwrd(rec,9)
   zmax=zmin
else
   zmin=subwrd(rec,11)
   zmax=subwrd(rec,13)
endif

* Get full z-dimensions of dataset.

'q file'
rec=sublin(result,5)
zsize=subwrd(rec,9)

* Determine spatially varying bounding pressure levels for isen surface
* tabove = theta-value at level above ; tbelow = theta value at level
* below for each gridpoint

'set z 1 'zsize
'define theta='tgrid'*pow(1000/'pgrid',0.286)'
'set z 2 'zsize
'define thetam='tgrid'(z-1)*pow(1000/'pgrid'(z-1),0.286)'
'set z 1 'zsize-1
'define thetap='tgrid'(z+1)*pow(1000/'pgrid'(z+1),0.286)'

'define tabove=0.5*maskout(theta,theta-'tlev')+0.5*maskout(theta,'tlev'-thetam)'
'define tbelow=0.5*maskout(theta,thetap-'tlev')+0.5*maskout(theta,'tlev'-theta)'

* Isolate field values at bounding pressure levels
* fabove = requested field value above isen surface
* fbelow = requested field value below isen surface

'define fabove=tabove*0+'field
'define fbelow=tbelow*0+'field

'set z 1'

* Turn this 3-D grid of values (mostly undefined) into a 2-D isen layer

* If more than one layer is valid (rare), take the mean of all the
* valid levels. Not the best way to deal with the multi-layer issue,
* but works well, rarely if ever impacts output, and is quick.
* Ideally, only the upper most level would be used.  However, this
* is not easily done using current GrADS intrinsic functions.

'define fabove=mean(fabove,z=1,z='zsize')'
'define fbelow=mean(fbelow,z=1,z='zsize')'
'define tabove=mean(tabove,z=1,z='zsize')'
'define tbelow=mean(tbelow,z=1,z='zsize')'

* Finally, interpolate linearly in theta and create isen surface.
* Linear interpolation in theta works b/c it scales as height,
* or log-P, from Poisson equation for pot temp.

'set z 'zmin ' ' zmax

'define slope=(fabove-fbelow)/(tabove-tbelow)'
'define b=fbelow-slope*tbelow'
'define interp=slope*'tlev'+b'

* variable interp now holds isentropic field and its named it returned
* for use by the user.

say 'Done.  Newly defined variable interp has 'tlev'K 'field'-field.'

return(interp)
* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
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

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
function getgrid(dodsvar,myvar)

'set lon '_xdim
'set lat '_ydim
'set lev '_zgrd
'set time '_tdim

* schrijf een variabele naar een bestand
'set gxout fwrite'
'set fwrite dummy.dat'
'd 'dodsvar
'disable fwrite'

* schrijf het descriptor bestand (.ctl)
rc = write(dummy.ctl,'dset ^dummy.dat')
rc = write(dummy.ctl,_undef,append)
rc = write(dummy.ctl,'xdef 1 linear 1 1',append)
rc = write(dummy.ctl,'ydef 1 linear 1 1',append)
rc = write(dummy.ctl,_zdef,append)
rc = write(dummy.ctl,_tdef,append)
rc = write(dummy.ctl,'vars 1',append)
rc = write(dummy.ctl,'dummy '_newzsize' -999 dummy',append)
rc = write(dummy.ctl,'endvars',append)
rc = close (dummy.ctl)

* Open the dummy file, define variable, close dummy file
'open dummy.ctl'
line = sublin(result,2)
dummyfile = subwrd(line,8)
'set dfile 'dummyfile
'set lon 1'
'set lat 1'
'set lev '_zbot' '_ztop
'set time '_time1' '_time2
'define 'myvar' = dummy.'dummyfile
'close 'dummyfile
'set dfile 1'
return

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
function getetarh(dodsvar,myvar)

* drukveriabelen eruit halen
tmpzgrd = _zgrd
tmpzdef = _zdef
tmpzbot = _zbot
tmpztop = _ztop
tmpzsize = _newzsize

* rh data over de rh-druk range
_zgrd = _rhzgrd
_zdef = _trhzdef
_ztop = _rhztop
_zbot = _rhzbot
_newzsize = _trhzsize
getgrid(dodsvar,tmprh)

* stop er de originele drukveriabelen terug in
_zgrd = tmpzgrd
_zdef = tmpzdef
_zbot = tmpzbot
_ztop = tmpztop
_newzsize = tmpzsize

'set lon '_xdim
'set lat '_ydim
'set lev '_rhzgrd
'set time '_tdim

* schrijf de veriabelen naar een textfile
'set gxout fwrite'
'set fwrite dummy.dat'
t = _t1
while (t <= _t2)
  'set t 't
  z = 1
  while (z <= _newrhzsize)
    level = subwrd(_rhlevs,z) 
    'set lev 'level
    'd tmprh'
    z = z + 1
  endwhile
  t = t + 1
endwhile
'disable fwrite'

* schrijf terug het descriptor bestand (ctl) 
rc = write(dummy.ctl,'dset ^dummy.dat')
rc = write(dummy.ctl,_undef,append)
rc = write(dummy.ctl,'xdef 1 linear 1 1',append)
rc = write(dummy.ctl,'ydef 1 linear 1 1',append)
rc = write(dummy.ctl,_rhzdef,append)
rc = write(dummy.ctl,_tdef,append)
rc = write(dummy.ctl,'vars 1',append)
rc = write(dummy.ctl,'dummy '_newrhzsize' -999 dummy',append)
rc = write(dummy.ctl,'endvars',append)
rc = close (dummy.ctl)

* open het dummy bestand, maak instanties aan & sluit het
'open dummy.ctl'
line = sublin(result,2)
dummyfile = subwrd(line,8)
'set dfile 'dummyfile
'set lon 1'
'set lat 1'
'set lev '_rhzbot' '_rhztop
'set time '_time1' '_time2
'q dims'
'define 'myvar' = dummy.'dummyfile
'close 'dummyfile
'set dfile 1'

return

* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
function getseries(dodsvar,myvar,level)

*'set lon '_xdim
*'set lat '_ydim
*'set lev 'level' 'level
'set time '_tdim

* schrijf een veriabele naar een bestand
'set fwrite dummy.dat'
'set gxout fwrite'
'd 'dodsvar
'disable fwrite'

* schrijf het descriptor bestand 
rc = write(dummy.ctl,'dset ^dummy.dat')
rc = write(dummy.ctl,_undef,append)
rc = write(dummy.ctl,'xdef 1 linear 1 1',append)
rc = write(dummy.ctl,'ydef 1 linear 1 1',append)
rc = write(dummy.ctl,'zdef 1 linear 1 1',append)
rc = write(dummy.ctl,_tdef,append)
rc = write(dummy.ctl,'vars 1',append)
rc = write(dummy.ctl,'dummy 0 -999 dummy',append)
rc = write(dummy.ctl,'endvars',append)
rc = close(dummy.ctl)

* open het dummy bestand, maak een variabele aan en sluit het
'open dummy.ctl'
line = sublin(result,2)
dummyfile = subwrd(line,8)
'set dfile 'dummyfile
'set lon 1'
'set lat 1'
'set lev 'level
'set time '_time1' '_time2
'define 'myvar' = dummy.'dummyfile
'close 'dummyfile
'set dfile 1'
'set gxout contour'

return
